const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const {
    registerUser,
    loginUser,
    updateProfile,
    changePassword
} = require("../controllers/authController");

// Register
router.post(
    "/register",
    upload.single("profile_photo"),
    registerUser
);

// Login
router.post("/login", loginUser);

// Update Profile
router.put(
    "/update-profile",
    upload.single("profile_photo"),
    updateProfile
);

router.put(
    "/change-password",
    changePassword
);
module.exports = router;