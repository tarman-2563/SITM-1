const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary (you can also use local storage)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Local storage configuration
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/documents');
    // Create directory if it doesn't exist
    const fs = require('fs');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${name}_${uniqueSuffix}${ext}`);
  }
});

// Cloudinary storage configuration
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sitm/documents',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    resource_type: 'auto',
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const name = file.originalname.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
      return `${name}_${uniqueSuffix}`;
    },
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, PDF, DOC, and DOCX files are allowed.'), false);
  }
};

// Create multer upload middleware
const createUploadMiddleware = (useCloudinary = false) => {
  const storage = useCloudinary && process.env.CLOUDINARY_CLOUD_NAME ? cloudinaryStorage : localStorage;
  
  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: fileFilter,
  });
};

// Upload middleware for single file
const uploadSingle = (fieldName, useCloudinary = false) => {
  return createUploadMiddleware(useCloudinary).single(fieldName);
};

// Upload middleware for multiple files
const uploadMultiple = (fieldName, maxCount = 5, useCloudinary = false) => {
  return createUploadMiddleware(useCloudinary).array(fieldName, maxCount);
};

// Upload middleware for multiple fields
const uploadFields = (fields, useCloudinary = false) => {
  return createUploadMiddleware(useCloudinary).fields(fields);
};

// Helper function to get file URL
const getFileUrl = (file, req) => {
  if (file.path && file.path.includes('cloudinary')) {
    // Cloudinary URL
    return file.path;
  } else {
    // Local file URL
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = file.path.replace(path.join(__dirname, '../'), '');
    return `${baseUrl}/${relativePath.replace(/\\/g, '/')}`;
  }
};

// Helper function to delete file
const deleteFile = async (filePath) => {
  try {
    if (filePath.includes('cloudinary')) {
      // Extract public_id from Cloudinary URL
      const publicId = filePath.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`sitm/documents/${publicId}`);
    } else {
      // Delete local file
      const fs = require('fs');
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  getFileUrl,
  deleteFile,
  cloudinary
};