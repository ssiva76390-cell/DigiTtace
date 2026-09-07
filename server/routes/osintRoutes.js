const express = require("express");

const router = express.Router();

const {
    usernameAnalysis
} = require("../controllers/osintController");

router.post("/username", usernameAnalysis);

module.exports = router;