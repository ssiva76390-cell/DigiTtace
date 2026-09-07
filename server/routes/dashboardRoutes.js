const express = require("express");

const router = express.Router();

const {

    getStats

} = require("../controllers/dashboardController");

router.get("/stats", getStats);

module.exports = router;