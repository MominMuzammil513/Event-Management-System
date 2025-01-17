import multer from "multer";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Save files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename files to avoid conflicts
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

export default upload;