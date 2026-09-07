const db = require("../config/db");

const getStats = (req, res) => {

    const sql = `
    SELECT
    (SELECT COUNT(*) FROM users) AS totalUsers,

    (SELECT COUNT(*) FROM search_history) AS totalSearches,

    (SELECT COUNT(*) FROM search_history
    WHERE search_type='Username') AS usernameSearches,

    (SELECT COUNT(*) FROM search_history
    WHERE search_type='Email') AS emailSearches,

    (SELECT COUNT(*) FROM search_history
    WHERE search_type='Image') AS imageSearches
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(result[0]);

    });

};

module.exports = {
    getStats
};