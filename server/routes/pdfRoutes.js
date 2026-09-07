const express = require("express");

const router = express.Router();

const {
    downloadReport
} = require("../controllers/pdfController");

router.post("/download", downloadReport);

module.exports = router;