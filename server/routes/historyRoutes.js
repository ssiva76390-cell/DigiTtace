const express = require("express");

const router = express.Router();

const {

    addHistory,
    historyList,
    removeHistory,
    removeAllHistory

} = require("../controllers/historyController");

router.post("/save", addHistory);

router.get("/:username", historyList);

// Clear All MUST come before :id
router.delete("/clear/:username", removeAllHistory);

router.delete("/:id", removeHistory);

module.exports = router;