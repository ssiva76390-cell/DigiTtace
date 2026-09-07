// ================= LOAD USER =================

const user = JSON.parse(localStorage.getItem("user"));

if (user) {

    document.getElementById("fullName").value =
        user.full_name;

    document.getElementById("email").value =
        user.email;

    document.getElementById("phone").value =
        user.phone;

}

// ================= UPDATE PROFILE =================

const settingsForm =
document.getElementById("settingsForm");

settingsForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        "username",
        user.username
    );

    formData.append(
        "full_name",
        document.getElementById("fullName").value
    );

    formData.append(
        "email",
        document.getElementById("email").value
    );

    formData.append(
        "phone",
        document.getElementById("phone").value
    );

    const photo =
        document.getElementById("profilePhoto").files[0];

    if (photo) {

        formData.append(
            "profile_photo",
            photo
        );

    }

    const response = await fetch(

        "/api/auth/update-profile",

        {

            method: "PUT",

            body: formData

        }

    );

    const data = await response.json();

if (data.success) {

    alert(data.message);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    currentUser.full_name = data.user.full_name;
    currentUser.email = data.user.email;
    currentUser.phone = data.user.phone;

    if (data.user.profile_photo) {
        currentUser.profile_photo = data.user.profile_photo;
    }

    localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
    );

    window.location.href = "dashboard.html";

} else {

    alert(data.message);

}

if (data.success) {

    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    currentUser.full_name = data.user.full_name;

    currentUser.email = data.user.email;

    currentUser.phone = data.user.phone;

    if (data.user.profile_photo) {

        currentUser.profile_photo =
            data.user.profile_photo;

    }

    localStorage.setItem(

        "user",

        JSON.stringify(currentUser)

    );

    window.location.href = "dashboard.html";

}

});

// ================= CHANGE PASSWORD =================

const passwordForm =
document.getElementById("passwordForm");

if (passwordForm) {

    passwordForm.addEventListener("submit", async (e) => {

        console.log("Password Button Clicked");
        
        e.preventDefault();

        const oldPassword =
            document.getElementById("oldPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (newPassword !== confirmPassword) {

            alert("New Password and Confirm Password do not match");

            return;

        }

        const response = await fetch(

            "/api/auth/change-password",

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username: user.username,

                    oldPassword,

                    newPassword

                })

            }

        );

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            passwordForm.reset();

        }

    });

}

