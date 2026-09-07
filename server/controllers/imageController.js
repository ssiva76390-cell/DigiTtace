const fs = require("fs");
const sharp = require("sharp");

const analyzeImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded"
            });

        }

        const filePath = req.file.path;

        const stats = fs.statSync(filePath);

        const metadata = await sharp(filePath).metadata();

        let score = 90;
        let risk = "🟢 Low";

        if (stats.size > 5 * 1024 * 1024) {

            score = 80;
            risk = "🟡 Medium";

        }

        res.json({

            success: true,

            uploadedFile: "/uploads/" + req.file.filename,

            fileName: req.file.originalname,

            fileSize: (stats.size / 1024).toFixed(2) + " KB",

            fileType: req.file.mimetype,

            width: metadata.width,

            height: metadata.height,

            format: metadata.format,

            colorSpace: metadata.space,

            channels: metadata.channels,

            similarity: "Not Checked",

            publicMatch: "Not Available",

            score,

            risk

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = {

    analyzeImage

};