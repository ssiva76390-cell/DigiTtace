require("dotenv").config();

const express = require("express");
const db = require("./config/db");

const app = express();

app.use(express.json());

app.use(express.static("client"));

app.get("/", (req, res) => {
    res.send("🚀 DigiTrace Server Running Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});