/**
 * ============================================================================
 * ElleBeeLuxeBeads — SQLite Database Initializer
 * ============================================================================
 * Uses better-sqlite3 (synchronous API, fast, zero-config)
 * Run schema creation on startup; all tables use IF NOT EXISTS for safety.
 * ============================================================================
 */

const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "ellabeeluxebeads.db");

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    // Enable WAL mode for better concurrency
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    /* ── Admins ─────────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS admins (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      email       TEXT    NOT NULL UNIQUE,
      password_hash TEXT  NOT NULL,
      name        TEXT    NOT NULL DEFAULT 'Admin',
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Categories ─────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS categories (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      slug          TEXT    NOT NULL UNIQUE,
      image_url     TEXT,
      is_published  INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Products ───────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS products (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT    NOT NULL,
      slug            TEXT    NOT NULL UNIQUE,
      category_id     INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      price           REAL    NOT NULL DEFAULT 0,
      discount_price  REAL,
      description     TEXT,
      badge           TEXT,
      sku             TEXT,
      availability    TEXT    NOT NULL DEFAULT 'available',
      is_featured     INTEGER NOT NULL DEFAULT 0,
      is_published    INTEGER NOT NULL DEFAULT 1,
      display_order   INTEGER NOT NULL DEFAULT 0,
      materials       TEXT,
      sizing          TEXT,
      care            TEXT,
      seo_title       TEXT,
      seo_description TEXT,
      created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Product Images ─────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS product_images (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      url           TEXT    NOT NULL,
      public_id     TEXT,
      is_primary    INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Collections ────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS collections (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      name            TEXT    NOT NULL,
      slug            TEXT    NOT NULL UNIQUE,
      description     TEXT,
      cover_image_url TEXT,
      is_published    INTEGER NOT NULL DEFAULT 1,
      display_order   INTEGER NOT NULL DEFAULT 0,
      created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Collection <> Products ─────────────────────────────── */
    CREATE TABLE IF NOT EXISTS collection_products (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
      product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      display_order INTEGER NOT NULL DEFAULT 0,
      UNIQUE(collection_id, product_id)
    );

    /* ── Customers ──────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS customers (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      phone      TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Orders ─────────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS orders (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number     TEXT    NOT NULL UNIQUE,
      customer_id      INTEGER REFERENCES customers(id) ON DELETE SET NULL,
      customer_name    TEXT    NOT NULL,
      customer_phone   TEXT,
      estimated_total  REAL    NOT NULL DEFAULT 0,
      note             TEXT,
      status           TEXT    NOT NULL DEFAULT 'new',
      created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Order Items ────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS order_items (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id      INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id    INTEGER REFERENCES products(id) ON DELETE SET NULL,
      product_name  TEXT    NOT NULL,
      product_price REAL    NOT NULL,
      quantity      INTEGER NOT NULL DEFAULT 1
    );

    /* ── Testimonials ───────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS testimonials (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT    NOT NULL,
      content       TEXT    NOT NULL,
      rating        INTEGER NOT NULL DEFAULT 5,
      image_url     TEXT,
      is_published  INTEGER NOT NULL DEFAULT 1,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Gallery ────────────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS gallery (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      image_url     TEXT    NOT NULL,
      public_id     TEXT,
      caption       TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_published  INTEGER NOT NULL DEFAULT 1,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Homepage Content ───────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS homepage_content (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      section    TEXT    NOT NULL,
      key        TEXT    NOT NULL,
      value      TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(section, key)
    );

    /* ── Site Settings ──────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS site_settings (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      key        TEXT    NOT NULL UNIQUE,
      value      TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Activity Logs ──────────────────────────────────────── */
    CREATE TABLE IF NOT EXISTS activity_logs (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_id    INTEGER REFERENCES admins(id) ON DELETE SET NULL,
      action      TEXT    NOT NULL,
      entity_type TEXT,
      entity_id   INTEGER,
      details     TEXT,
      created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    /* ── Indexes ────────────────────────────────────────────── */
    CREATE INDEX IF NOT EXISTS idx_products_category    ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_products_featured    ON products(is_featured);
    CREATE INDEX IF NOT EXISTS idx_products_published   ON products(is_published);
    CREATE INDEX IF NOT EXISTS idx_product_images_pid  ON product_images(product_id);
    CREATE INDEX IF NOT EXISTS idx_orders_status        ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_customer      ON orders(customer_id);
    CREATE INDEX IF NOT EXISTS idx_activity_admin       ON activity_logs(admin_id);
    CREATE INDEX IF NOT EXISTS idx_activity_entity      ON activity_logs(entity_type, entity_id);
  `);
}

// Trigger to auto-update updated_at
function initTriggers() {
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS products_updated_at
    AFTER UPDATE ON products
    BEGIN
      UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

    CREATE TRIGGER IF NOT EXISTS orders_updated_at
    AFTER UPDATE ON orders
    BEGIN
      UPDATE orders SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
}

// Helper: log admin activity
function logActivity(adminId, action, entityType = null, entityId = null, details = null) {
  try {
    const d = getDb();
    d.prepare(`
      INSERT INTO activity_logs (admin_id, action, entity_type, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(adminId, action, entityType, entityId, details ? JSON.stringify(details) : null);
  } catch (err) {
    console.error("Activity log error:", err.message);
  }
}

// Initialize on first import
getDb();
try { initTriggers(); } catch (_) { /* triggers already exist */ }

module.exports = { getDb, logActivity };
