const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Connect to your Cloudinary account using secret keys from .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Configure how images are stored on Cloudinary (v4.x syntax)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Wanderlust_DEV",
        allowed_formats: ["jpeg", "png", "jpg"]
    }
});

// Export so other files can use cloudinary and storage
module.exports = { cloudinary, storage };