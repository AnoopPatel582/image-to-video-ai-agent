const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const {
  uploadImage,
  generateVideo,
} = require("../controllers/videoController");

router.post("/upload-image", upload.single("image"), uploadImage);
router.post("/generate-video", generateVideo);

module.exports = router;
