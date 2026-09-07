const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = new FormData(loginForm);

        const body = Object.fromEntries(formData);

        const response = await fetch("/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.location.href = "dashboard.html";

        }

    });

}