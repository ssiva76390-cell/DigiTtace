const db = require("../config/db");

// Save
const saveHistory = (username, type, value, callback) => {

    const sql = `
    INSERT INTO search_history
    (username, search_type, search_value)
    VALUES (?, ?, ?)
    `;

    db.query(sql, [username, type, value], callback);

};

// Get
const getHistory = (username, callback) => {

    const sql = `
    SELECT *
    FROM search_history
    WHERE username=?
    ORDER BY id DESC
    `;

    db.query(sql, [username], callback);

};

// Delete One
const deleteHistory = (id, callback) => {

    const sql = `
    DELETE FROM search_history
    WHERE id=?
    `;

    db.query(sql, [id], callback);

};

// Clear All
const clearHistory = (username, callback) => {

    const sql = `
    DELETE FROM search_history
    WHERE username=?
    `;

    db.query(sql, [username], callback);

};

module.exports = {

    saveHistory,
    getHistory,
    deleteHistory,
    clearHistory

};