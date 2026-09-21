/**
 * ============================================================================
 * ElleBeeLuxeBeads — Image Upload Middleware (Cloudinary)
 * ============================================================================
 * Uses multer for multipart/form-data parsing (memory storage)
 * then streams directly to Cloudinary — no disk writes needed.
 *
 * To switch to local disk storage in the future:
 *   1. Change storage to multer.diskStorage({ destination: 'uploads/...' })
 *   2. Return the local file path instead of Cloudinary URL
 *   3. Serve /uploads via express.static in index.js
 * ============================================================================
 */

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_FOLDER = process.env.CLOUDINARY_UPLOAD_FOLDER || "ellabeeluxebeads";

// multer — in-memory storage (buffer sent to Cloudinary)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (JPEG, PNG, WebP, SVG, GIF)"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

/**
 * Upload a buffer to Cloudinary
 * @param {Buffer} buffer - image buffer from multer
 * @param {string} folder - sub-folder (products, gallery, categories, brand)
 * @param {string} [publicId] - optional specific public_id for overwrite
 * @returns {Promise<{url: string, public_id: string}>}
 */
function uploadToCloudinary(buffer, folder = "products", publicId = null) {
  return new Promise((resolve, reject) => {
    const options = {
      folder: `${UPLOAD_FOLDER}/${folder}`,
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    };
    if (publicId) options.public_id = publicId;

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({ url: result.secure_url, public_id: result.public_id });
    });

    uploadStream.end(buffer);
  });
}

/**
 * Delete an image from Cloudinary by its public_id
 */
async function deleteFromCloudinary(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
}

module.exports = { upload, uploadToCloudinary, deleteFromCloudinary };
