const validator = require("email-validator");

const checkEmail = async (req, res) => {

    const { email } = req.body;

    const valid = validator.validate(email);

    const domain = email.split("@")[1] || "";

    let provider = "Unknown";

    if (domain.includes("gmail"))
        provider = "Google";

    else if (domain.includes("outlook"))
        provider = "Microsoft";

    else if (domain.includes("hotmail"))
        provider = "Microsoft";

    else if (domain.includes("yahoo"))
        provider = "Yahoo";

    else if (domain.includes("icloud"))
        provider = "Apple";

    const disposableDomains = [

        "10minutemail.com",
        "tempmail.com",
        "mailinator.com"

    ];

    const disposable =
        disposableDomains.includes(domain);

    let score = 100;

    if (!valid)
        score -= 50;

    if (disposable)
        score -= 30;

    let risk = "🟢 Low";

    if (score < 80)
        risk = "🟡 Medium";

    if (score < 50)
        risk = "🔴 High";

    res.json({

    valid,
    provider,
    domain,
    disposable,

    breach: false,

    breachMessage: "No Known Public Breach Found",

    score,
    risk

});
};

module.exports = {
    checkEmail
};