const generateReport = (req, res) => {

    const {

        usernameScore,
        emailScore,
        imageScore

    } = req.body;

    const overall = Math.round(

        (usernameScore + emailScore + imageScore) / 3

    );

    let risk = "🟢 Low";

    if (overall < 80)
        risk = "🟡 Medium";

    if (overall < 50)
        risk = "🔴 High";

    res.json({

        overall,
        risk,

        recommendations: [

            "Use a strong password",
            "Enable Two-Factor Authentication",
            "Keep social media private",
            "Avoid sharing phone number publicly"

        ]

    });

};

module.exports = {
    generateReport
};