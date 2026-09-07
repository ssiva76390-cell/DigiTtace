const axios = require("axios");

const usernameAnalysis = async (req, res) => {

    const { username } = req.body;

    const result = {
        github: false,
        githubUrl: "",
        githubData: null,

        reddit: false,
        redditUrl: "",

        linkedin: false,
        linkedinUrl: "",

        instagram: false,
        instagramUrl: "",

        score: 100,
        risk: "Low"
    };

    // ================= GITHUB =================

    try {

        const github = await axios.get(
            `https://api.github.com/users/${username}`
        );

        result.github = true;

        result.githubData = {

            avatar: github.data.avatar_url,

            name: github.data.name,

            bio: github.data.bio,

            repos: github.data.public_repos,

            followers: github.data.followers,

            following: github.data.following,

            joined: github.data.created_at,

            profile: github.data.html_url

        };

        result.githubUrl = github.data.html_url;

        result.score -= 20;

    } catch {

        result.github = false;

    }

    // ================= REDDIT =================

    try {

        await axios.get(
            `https://www.reddit.com/user/${username}/about.json`
        );

        result.reddit = true;

        result.redditUrl =
            `https://www.reddit.com/user/${username}`;

        result.score -= 15;

    } catch {}

    // ================= DEMO =================

    result.linkedin = false;
    result.instagram = false;

    // ================= RISK =================

    if (result.score >= 80) {

        result.risk = "🟢 Low";

    } else if (result.score >= 50) {

        result.risk = "🟡 Medium";

    } else {

        result.risk = "🔴 High";

    }

    res.json(result);

};

module.exports = {
    usernameAnalysis
};