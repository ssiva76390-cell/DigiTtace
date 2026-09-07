const bcrypt = require("bcrypt");
const db = require("../config/db");


// ================= REGISTER =================

const registerUser = async (req, res) => {

    try {

        const {
            full_name,
            username,
            email,
            phone,
            password
        } = req.body;

        const profile_photo =
            req.file ? req.file.filename : null;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql = `
        INSERT INTO users
        (full_name, username, email, phone, password, profile_photo)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                full_name,
                username,
                email,
                phone,
                hashedPassword,
                profile_photo
            ],
            (err, result) => {

                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    message: "User Registered Successfully"
                });

            }
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ================= LOGIN =================

const loginUser = async (req, res) => {

    try {

        const { username, password } = req.body;

        const sql = `
        SELECT * FROM users
        WHERE username = ?
        OR email = ?
        `;

        db.query(sql, [username, username], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(
                password,
                user.password
            );

            if (!match) {
                return res.json({
                    success: false,
                    message: "Wrong Password"
                });
            }

            db.query(
                "UPDATE users SET last_login = NOW() WHERE username=?",
                [user.username],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    db.query(
                        "SELECT * FROM users WHERE username=?",
                        [user.username],
                        (err, result) => {

                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    message: err.message
                                });
                            }

                            res.json({
                                success: true,
                                message: "Login Successful",
                                user: result[0]
                            });

                        }
                    );

                }
            );

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ================= UPDATE PROFILE =================

const updateProfile = (req, res) => {

    const {
        username,
        full_name,
        email,
        phone
    } = req.body;

    let sql = `
    UPDATE users
    SET full_name = ?,
        email = ?,
        phone = ?
    `;

    let values = [
        full_name,
        email,
        phone
    ];

    if (req.file) {

        sql += `,
        profile_photo = ?`;

        values.push(req.file.filename);

    }

    sql += `
    WHERE username = ?`;

    values.push(username);

    db.query(sql, values, (err) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: err.message
            });

        }

       res.json({
    success: true,
    message: "Profile Updated Successfully",
    user: {
        username,
        full_name,
        email,
        phone,
        profile_photo: req.file ? req.file.filename : null
    }
});

    });

};

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {

    try {

        const {

            username,
            oldPassword,
            newPassword

        } = req.body;

        db.query(

            "SELECT password FROM users WHERE username=?",

            [username],

            async (err, result) => {

                if (err) {

                    return res.status(500).json({

                        success: false,
                        message: err.message

                    });

                }

                if (result.length === 0) {

                    return res.json({

                        success: false,
                        message: "User Not Found"

                    });

                }

                const match = await bcrypt.compare(

                    oldPassword,

                    result[0].password

                );

                if (!match) {

                    return res.json({

                        success: false,
                        message: "Current Password is Incorrect"

                    });

                }

                const hashedPassword =
                    await bcrypt.hash(newPassword, 10);

                db.query(

                    "UPDATE users SET password=? WHERE username=?",

                    [

                        hashedPassword,

                        username

                    ],

                    (err) => {

                        if (err) {

                            return res.status(500).json({

                                success: false,
                                message: err.message

                            });

                        }

                        res.json({

                            success: true,
                            message: "Password Changed Successfully"

                        });

                    }

                );

            }

        );

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


module.exports = {

    registerUser,
    loginUser,
    updateProfile,
    changePassword

};