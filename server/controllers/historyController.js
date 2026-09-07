const {
    saveHistory,
    getHistory,
    deleteHistory,
    clearHistory
} = require("../models/historyModel");

// Save History
const addHistory = (req, res) => {

    const {
        username,
        search_type,
        search_value
    } = req.body;

    saveHistory(username, search_type, search_value, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            message: "History Saved"
        });

    });

};

// Get History
const historyList = (req, res) => {

    const username = req.params.username;

    getHistory(username, (err, result) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json(result);

    });

};

// Delete One History
const removeHistory = (req, res) => {

    deleteHistory(req.params.id, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            message: "History Deleted"
        });

    });

};

// Clear All History
const removeAllHistory = (req, res) => {

    clearHistory(req.params.username, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

        res.json({
            success: true,
            message: "All History Deleted"
        });

    });

};

module.exports = {
    addHistory,
    historyList,
    removeHistory,
    removeAllHistory
};