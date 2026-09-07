require("dotenv").config();
const pdfRoutes = require("./routes/pdfRoutes");
const reportRoutes =
require("./routes/reportRoutes");
const imageRoutes =
require("./routes/imageRoutes");
const emailRoutes = require("./routes/emailRoutes");
const osintRoutes = require("./routes/osintRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");

const express = require("express");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const historyRoutes =
require("./routes/historyRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS

app.use("/uploads", express.static("server/uploads")); // <-- ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use(express.static("client"));
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/osint", osintRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
    res.send("🚀 DigiTrace Server Running Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});