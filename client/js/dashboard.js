// ================= LOAD USER =================

const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("fullName").textContent =
        user.full_name;

    document.getElementById("username").textContent =
        user.username;

    document.getElementById("email").textContent =
        user.email;

    document.getElementById("phone").textContent =
        user.phone;

    document.getElementById("userName").textContent =
        user.full_name;

    if (user.profile_photo) {

    document.querySelector(".user img").src =
        "/uploads/" + user.profile_photo;

}    

    // ===== Profile Photo =====

    const profileImg =
        document.querySelector(".user img");

    if (user.profile_photo) {

        profileImg.src =
            "/uploads/" + user.profile_photo;

    } else {

        profileImg.src =
            "../images/default-user.png";

    }

}
// ================= LOGOUT =================

const logout = document.getElementById("logout");

if (logout) {

    logout.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            localStorage.removeItem("user");
            window.location.href = "login.html";

        }

    });

}

// ================= USERNAME ANALYSIS =================
const analyzeBtn =
document.getElementById("analyzeBtn");
analyzeBtn.addEventListener("click", async () => {

    const username =
    document.getElementById("usernameInput").value;

    if(username===""){

        alert("Enter Username");
        return;

    }

    const response = await fetch("/api/osint/username",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({username})

    });

    const data = await response.json();

    await fetch("/api/history/save", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        username: user.username,

        search_type: "Username",

        search_value: username

    })

});

document.getElementById("usernameResult").innerHTML = `

<h3>Analysis Result</h3>

${data.github ? `

<div class="github-card">

    <h3>🐙 GitHub Profile</h3>

    <img
        src="${data.githubData.avatar}"
        width="90"
        style="border-radius:50%;margin-bottom:10px;">

    <p><b>Name:</b>
    ${data.githubData.name || "Not Available"}</p>

    <p><b>Bio:</b>
    ${data.githubData.bio || "No Bio"}</p>

    <p><b>Repositories:</b>
    ${data.githubData.repos}</p>

    <p><b>Followers:</b>
    ${data.githubData.followers}</p>

    <p><b>Following:</b>
    ${data.githubData.following}</p>

    <p><b>Joined:</b>
    ${new Date(data.githubData.joined).toLocaleDateString()}</p>

    <a
        href="${data.githubData.profile}"
        target="_blank">

        🔗 Open GitHub Profile

    </a>

</div>

` : `f

<p>

<b>GitHub:</b>

❌ Not Found

</p>

`}

<p>
<b>Reddit:</b>
${data.reddit ? "✅ Found" : "❌ Not Found"}
</p>

${data.reddit ? `
<a href="${data.redditUrl}"
target="_blank">

Open Reddit Profile

</a>
<br><br>
` : ""}

<p>
<b>LinkedIn:</b>
${data.linkedin ? "✅ Found" : "❌ Not Found"}
</p>

<p>
<b>Instagram:</b>
${data.instagram ? "✅ Found" : "❌ Not Found"}
</p>

<hr>

<h3>

Privacy Score

</h3>

<div class="score">

${data.score}%

</div>

<h3>

Risk Level

</h3>

<p>

${data.risk}

</p>

`;
});
// ================= EMAIL EXPOSURE =================

const emailBtn =
document.getElementById("emailCheckBtn");

if (emailBtn) {

    emailBtn.addEventListener("click", async () => {

        const email =
        document.getElementById("emailInput").value.trim();

        if (!email) {

            alert("Enter Email");
            return;

        }

        const response = await fetch("/api/email/check", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ email })

        });

        const data = await response.json();

        await fetch("/api/history/save", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        username: user.username,

        search_type: "Email",

        search_value: email

    })

});


        console.log(data);

        document.getElementById("emailResult").innerHTML = `

        <h3>Email Analysis</h3>

        <p><b>Valid:</b> ${data.valid ? "✅ Yes" : "❌ No"}</p>

        <p><b>Provider:</b> ${data.provider}</p>

        <p><b>Domain:</b> ${data.domain}</p>

        <p><b>Disposable:</b> ${data.disposable ? "⚠ Yes" : "✅ No"}</p>
            
        <p>

<b>Breach Status:</b>

${data.breach ? "⚠ Found" : "✅ Safe"}

</p>

<p>

${data.breachMessage}

</p>
        <hr>

        <h3>Privacy Score</h3>

        <div class="score">${data.score}%</div>

        <h3>Risk Level</h3>

        <p>${data.risk}</p>

        `;

    });

}

// ================= REVERSE IMAGE =================

const imageBtn =
document.getElementById("imageBtn");

if (imageBtn) {

    imageBtn.addEventListener("click", async () => {

        const file =
        document.getElementById("imageInput").files[0];

        if (!file) {

            alert("Select Image");
            return;

        }

        const formData = new FormData();

        formData.append("image", file);


formData.append(

    "username",

    JSON.parse(localStorage.getItem("user")).username

);

        const response = await fetch("/api/image/analyze", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        await fetch("/api/history/save", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        username: user.username,

        search_type: "Image",

        search_value: file.name

    })

});

        document.getElementById("imagePreview").innerHTML = `

        <img
        src="${data.uploadedFile}"
        width="180">

        `;

       document.getElementById("imageResult").innerHTML = `

<h3>Image Analysis</h3>

<p><b>File Name:</b> ${data.fileName}</p>

<p><b>File Size:</b> ${data.fileSize}</p>

<p><b>File Type:</b> ${data.fileType}</p>

<p><b>Resolution:</b>
${data.width} × ${data.height}
</p>

<p><b>Format:</b>
${data.format}
</p>

<p><b>Color Space:</b>
${data.colorSpace}
</p>

<p><b>Channels:</b>
${data.channels}
</p>

<hr>

<div class="score">

${data.score}%

</div>

<p>

<b>Risk:</b>

${data.risk}

</p>

`;
    });

}

// ================= PRIVACY REPORT =================

const reportBtn =
document.getElementById("reportBtn");

if (reportBtn) {

    reportBtn.addEventListener("click", async () => {

        const response = await fetch(

            "/api/report/generate",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    usernameScore: 80,

                    emailScore: 100,

                    imageScore: 92

                })

            }

        );

        const data = await response.json();

        document.getElementById("reportResult").innerHTML = `

        <h3>Privacy Report</h3>

        <div class="score">

        ${data.overall}%

        </div>

        <h3>

        Risk Level

        </h3>

        <p>

        ${data.risk}

        </p>

        <hr>

        <h3>

        Recommendations

        </h3>

        

        ${data.recommendations
            .map(item => `<p>✔ ${item}</p>`)
            .join("")}

        <button
        class="downloadBtn"
        id="downloadPdf">

        Download PDF

        

        </button>

        `;

    });

}

// ================= Dashboard Statistics =================

fetch("/api/dashboard/stats")

.then(res => res.json())

.then(data => {

document.getElementById("totalUsers").textContent =
data.totalUsers;

document.getElementById("totalSearches").textContent =
data.totalSearches;

document.getElementById("usernameSearches").textContent =
data.usernameSearches;

document.getElementById("emailSearches").textContent =
data.emailSearches;

document.getElementById("imageSearches").textContent =
data.imageSearches;

});

// ================= PDF DOWNLOAD =================

document.addEventListener("click", async (e) => {

    if (e.target.id !== "downloadPdf") return;

    try {

        const response = await fetch("/api/pdf/download", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

    fullName: user.full_name,

    username: user.username,

    email: user.email,

    profilePhoto: user.profile_photo,

    score: 91,

    risk: "Low"

})
        });

        if (!response.ok) {

            alert("PDF Download Failed");
            return;

        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "DigiTrace_Report.pdf";

        document.body.appendChild(a);

        a.click();

        a.remove();

        window.URL.revokeObjectURL(url);

    } catch (err) {

        console.error(err);
        alert("Unable to download PDF");

    }

});

// ================= DYNAMIC PRIVACY SCORE =================

fetch("/api/dashboard/stats")

.then(res => res.json())

.then(data => {

    const usernameScore =
        data.usernameSearches > 0 ? 90 : 100;

    const emailScore =
        data.emailSearches > 0 ? 90 : 100;

    const imageScore =
        data.imageSearches > 0 ? 90 : 100;

    const overall = Math.round(

        (usernameScore +
        emailScore +
        imageScore) / 3

    );

    document.getElementById("privacyScore").textContent =
        overall + "%";

    const risk =
        document.getElementById("riskLevel");

    if (overall >= 80) {

        risk.innerHTML =
            "🟢 LOW RISK";

    }

    else if (overall >= 50) {

        risk.innerHTML =
            "🟡 MEDIUM RISK";

    }

    else {

        risk.innerHTML =
            "🔴 HIGH RISK";

    }

});

// ================= DASHBOARD CHARTS =================

fetch("/api/dashboard/stats")

.then(res => res.json())

.then(data => {

    // ================= BAR CHART =================

    const searchCtx = document

        .getElementById("searchChart")

        .getContext("2d");

    new Chart(searchCtx, {

        type: "bar",

        data: {

            labels: [

                "Username",

                "Email",

                "Image"

            ],

            datasets: [{

                label: "Search Count",

                data: [

                    data.usernameSearches,

                    data.emailSearches,

                    data.imageSearches

                ],

                backgroundColor: [

                    "#38BDF8",

                    "#22C55E",

                    "#F59E0B"

                ]

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });


    // ================= PIE CHART =================

    const score = parseInt(

        document.getElementById("privacyScore")

        .textContent

    );

    const privacyCtx = document

        .getElementById("privacyChart")

        .getContext("2d");

    new Chart(privacyCtx, {

        type: "doughnut",

        data: {

            labels: [

                "Protected",

                "Remaining"

            ],

            datasets: [{

                data: [

                    score,

                    100 - score

                ],

                backgroundColor: [

                    "#22C55E",

                    "#334155"

                ]

            }]

        },

        options: {

            responsive: true

        }

    });

});