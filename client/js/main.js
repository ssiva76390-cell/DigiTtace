console.log("DigiTrace Started");

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        console.log("Submit button clicked");

        e.preventDefault();

        const formData = new FormData(registerForm);

        try {

            console.log("Sending request...");

            const response = await fetch("/api/auth/register", {
                method: "POST",
                body: formData
            });

            console.log("Status:", response.status);

            const data = await response.json();

            console.log(data);

            alert(data.message);

        } catch (error) {

            console.error(error);

            alert("Something went wrong!");

        }

    });

}