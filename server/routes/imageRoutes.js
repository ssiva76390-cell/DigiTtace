const express = require("express");

const router = express.Router();

const upload =
require("../config/multer");

const {
    analyzeImage
} =
require("../controllers/imageController");

router.post(
    "/analyze",
    upload.single("image"),
    analyzeImage
);

module.exports = router;