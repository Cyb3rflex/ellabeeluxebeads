/**
 * ============================================================================
 * Products Routes
 * ============================================================================
 * GET    /api/products           — list (public: published only; admin: all)
 * GET    /api/products/:id       — single product with images
 * POST   /api/products           — create (admin)
 * PUT    /api/products/:id       — update (admin)
 * DELETE /api/products/:id       — delete (admin)
 * POST   /api/products/:id/images            — upload image (admin)
 * DELETE /api/products/:id/images/:imageId   — delete image (admin)
 * PUT    /api/products/:id/images/:imageId/primary — set primary (admin)
 */

const express = require("express");
const slugify = require("slugify");
const { getDb, logActivity } = require("../db");
const { requireAuth } = require("../middleware/auth");
const { upload, uploadToCloudinary, deleteFromCloudinary } = require("../middleware/upload");

const router = express.Router();

/* ── Helpers ──────────────────────────────────────────────────────────────── */

function makeSlug(name, db) {
  let slug = slugify(name, { lower: true, strict: true });
  // Ensure unique slug
  let suffix = 0;
  let testSlug = slug;
  while (db.prepare("SELECT id FROM products WHERE slug = ?").get(testSlug)) {
    suffix++;
    testSlug = `${slug}-${suffix}`;
  }
  return testSlug;
}

function attachImages(db, product) {
  const images = db.prepare(
    "SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, display_order ASC"
  ).all(product.id);
  product.images = images;
  product.image = images.find(i => i.is_primary)?.url || images[0]?.url || null;
  product.gallery = images.map(i => i.url);
  return product;
}

function attachCategory(db, product) {
  if (product.category_id) {
    const cat = db.prepare("SELECT id, name, slug FROM categories WHERE id = ?").get(product.category_id);
    product.category = cat || null;
    product.category_name = cat?.name || null;
  } else {
    product.category = null;
    product.category_name = null;
  }
  return product;
}

/* ── GET /api/products ──────────────────────────────────────────────────── */
router.get("/", (req, res) => {
  const db = getDb();
  const isAdmin = req.headers.authorization?.startsWith("Bearer ");

  let query = "SELECT p.* FROM products p WHERE 1=1";
  const params = [];

  // Public API: only published
  if (!isAdmin) {
    query += " AND p.is_published = 1";
  }

  if (req.query.category) {
    const cat = db.prepare("SELECT id FROM categories WHERE slug = ? OR name = ?").get(req.query.category, req.query.category);
    if (cat) {
      query += " AND p.category_id = ?";
      params.push(cat.id);
    }
  }
  if (req.query.featured === "true") {
    query += " AND p.is_featured = 1";
  }
  if (req.query.search) {
    query += " AND (p.name LIKE ? OR p.description LIKE ?)";
    const q = `%${req.query.search}%`;
    params.push(q, q);
  }

  query += " ORDER BY p.is_featured DESC, p.display_order ASC, p.id DESC";

  const limit = parseInt(req.query.limit) || 100;
  query += ` LIMIT ${limit}`;

  let products = db.prepare(query).all(...params);
  products = products.map(p => {
    attachImages(db, p);
    attachCategory(db, p);
    return p;
  });

  res.json({ success: true, data: products });
});

/* ── GET /api/products/:id ──────────────────────────────────────────────── */
router.get("/:id", (req, res) => {
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });

  attachImages(db, product);
  attachCategory(db, product);

  // Related products (same category, exclude self)
  const related = db.prepare(
    "SELECT * FROM products WHERE category_id = ? AND id != ? AND is_published = 1 LIMIT 4"
  ).all(product.category_id, product.id);
  product.related = related.map(r => { attachImages(db, r); return r; });

  res.json({ success: true, data: product });
});

/* ── POST /api/products ─────────────────────────────────────────────────── */
router.post("/", requireAuth, (req, res) => {
  const db = getDb();
  const {
    name, category_id, price, discount_price, description, badge, sku,
    availability, is_featured, is_published, materials, sizing, care,
    seo_title, seo_description
  } = req.body;

  if (!name) return res.status(400).json({ success: false, message: "Product name is required." });

  const slug = makeSlug(name, db);

  const result = db.prepare(`
    INSERT INTO products (name, slug, category_id, price, discount_price, description, badge, sku,
      availability, is_featured, is_published, materials, sizing, care, seo_title, seo_description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    name.trim(), slug, category_id || null,
    parseFloat(price) || 0, discount_price ? parseFloat(discount_price) : null,
    description || null, badge || null, sku || null,
    availability || "available",
    is_featured ? 1 : 0, is_published !== false ? 1 : 0,
    materials || null, sizing || null, care || null,
    seo_title || null, seo_description || null
  );

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);
  attachImages(db, product);
  attachCategory(db, product);

  logActivity(req.admin.id, `Added product: "${name}"`, "product", product.id);
  res.status(201).json({ success: true, data: product, message: "Product created successfully." });
});

/* ── PUT /api/products/:id ──────────────────────────────────────────────── */
router.put("/:id", requireAuth, (req, res) => {
  const db = getDb();
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, message: "Product not found." });

  const {
    name, category_id, price, discount_price, description, badge, sku,
    availability, is_featured, is_published, materials, sizing, care,
    seo_title, seo_description, display_order
  } = req.body;

  db.prepare(`
    UPDATE products SET
      name = ?, category_id = ?, price = ?, discount_price = ?,
      description = ?, badge = ?, sku = ?, availability = ?,
      is_featured = ?, is_published = ?, materials = ?, sizing = ?,
      care = ?, seo_title = ?, seo_description = ?, display_order = ?
    WHERE id = ?
  `).run(
    name ?? existing.name, category_id ?? existing.category_id,
    price !== undefined ? parseFloat(price) : existing.price,
    discount_price !== undefined ? (discount_price ? parseFloat(discount_price) : null) : existing.discount_price,
    description ?? existing.description, badge ?? existing.badge,
    sku ?? existing.sku, availability ?? existing.availability,
    is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
    is_published !== undefined ? (is_published ? 1 : 0) : existing.is_published,
    materials ?? existing.materials, sizing ?? existing.sizing,
    care ?? existing.care, seo_title ?? existing.seo_title,
    seo_description ?? existing.seo_description,
    display_order ?? existing.display_order,
    req.params.id
  );

  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  attachImages(db, product);
  attachCategory(db, product);

  logActivity(req.admin.id, `Updated product: "${product.name}"`, "product", product.id);
  res.json({ success: true, data: product, message: "Product updated successfully." });
});

/* ── DELETE /api/products/:id ───────────────────────────────────────────── */
router.delete("/:id", requireAuth, async (req, res) => {
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });

  // Delete all Cloudinary images first
  const images = db.prepare("SELECT * FROM product_images WHERE product_id = ?").all(req.params.id);
  await Promise.all(images.map(img => deleteFromCloudinary(img.public_id)));

  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  logActivity(req.admin.id, `Deleted product: "${product.name}"`, "product", product.id);
  res.json({ success: true, message: `Product "${product.name}" deleted successfully.` });
});

/* ── POST /api/products/:id/images ─────────────────────────────────────── */
router.post("/:id/images", requireAuth, upload.single("image"), async (req, res) => {
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });
  if (!req.file) return res.status(400).json({ success: false, message: "No image file provided." });

  try {
    const { url, public_id } = await uploadToCloudinary(req.file.buffer, "products");

    const existingCount = db.prepare("SELECT COUNT(*) as c FROM product_images WHERE product_id = ?").get(req.params.id).c;
    const isPrimary = existingCount === 0 ? 1 : 0;

    const result = db.prepare(`
      INSERT INTO product_images (product_id, url, public_id, is_primary, display_order)
      VALUES (?, ?, ?, ?, ?)
    `).run(req.params.id, url, public_id, isPrimary, existingCount);

    const image = db.prepare("SELECT * FROM product_images WHERE id = ?").get(result.lastInsertRowid);
    logActivity(req.admin.id, `Uploaded image for product: "${product.name}"`, "product", product.id);
    res.json({ success: true, data: image, message: "Image uploaded successfully." });
  } catch (err) {
    console.error("Image upload error:", err);
    res.status(500).json({ success: false, message: "Image upload failed. Check Cloudinary credentials." });
  }
});

/* ── DELETE /api/products/:id/images/:imageId ───────────────────────────── */
router.delete("/:id/images/:imageId", requireAuth, async (req, res) => {
  const db = getDb();
  const image = db.prepare("SELECT * FROM product_images WHERE id = ? AND product_id = ?").get(req.params.imageId, req.params.id);
  if (!image) return res.status(404).json({ success: false, message: "Image not found." });

  await deleteFromCloudinary(image.public_id);
  db.prepare("DELETE FROM product_images WHERE id = ?").run(req.params.imageId);

  // If deleted was primary, set next image as primary
  if (image.is_primary) {
    const next = db.prepare("SELECT id FROM product_images WHERE product_id = ? ORDER BY display_order ASC LIMIT 1").get(req.params.id);
    if (next) db.prepare("UPDATE product_images SET is_primary = 1 WHERE id = ?").run(next.id);
  }

  res.json({ success: true, message: "Image deleted." });
});

/* ── PUT /api/products/:id/images/:imageId/primary ─────────────────────── */
router.put("/:id/images/:imageId/primary", requireAuth, (req, res) => {
  const db = getDb();
  db.prepare("UPDATE product_images SET is_primary = 0 WHERE product_id = ?").run(req.params.id);
  db.prepare("UPDATE product_images SET is_primary = 1 WHERE id = ? AND product_id = ?").run(req.params.imageId, req.params.id);
  res.json({ success: true, message: "Primary image updated." });
});

module.exports = router;
