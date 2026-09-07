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

    document.getElementById("createdAt").textContent =
    user.created_at
        ? new Date(user.created_at).toLocaleString()
        : "Not Available";

document.getElementById("lastLogin").textContent =
    user.last_login
        ? new Date(user.last_login).toLocaleString()
        : "First Login";   

    // Profile Photo

    const profilePhoto =
        document.getElementById("profilePhoto");

    if (user.profile_photo) {

        profilePhoto.src =
            "/uploads/" + user.profile_photo;

    } else {

        profilePhoto.src =
            "../images/default-user.png";

    }

}

// ================= LOAD DASHBOARD STATS =================

fetch("/api/dashboard/stats")

.then(res => res.json())

.then(data => {

    document.getElementById("totalSearches").textContent =
        data.totalSearches;

    document.getElementById("usernameSearches").textContent =
        data.usernameSearches;

    document.getElementById("emailSearches").textContent =
        data.emailSearches;

    document.getElementById("imageSearches").textContent =
        data.imageSearches;

})

.catch(err => {

    console.log(err);

});