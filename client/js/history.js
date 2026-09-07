const user = JSON.parse(localStorage.getItem("user"));

loadHistory();

function loadHistory() {

    fetch("/api/history/" + user.username)

        .then(res => res.json())

        .then(data => {

            let html = "";

            data.forEach(item => {

                html += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.search_type}</td>

                    <td>${item.search_value}</td>

                    <td>${new Date(item.searched_at).toLocaleString()}</td>

                    <td>

                        <button onclick="deleteHistory(${item.id})">

                            🗑 Delete

                        </button>

                    </td>

                </tr>

                `;

            });

            document.getElementById("historyTable").innerHTML = html;

        });

}

function deleteHistory(id) {

    if (!confirm("Delete this history?")) return;

    fetch("/api/history/" + id, {

        method: "DELETE"

    })

    .then(() => {

        loadHistory();

    });

}

document.getElementById("clearBtn")

.addEventListener("click", () => {

    if (!confirm("Clear all history?")) return;

    fetch("/api/history/clear/" + user.username, {

        method: "DELETE"

    })

    .then(() => {

        loadHistory();

    });

});

// ================= SEARCH FILTER =================

document.getElementById("searchBox")

.addEventListener("keyup", () => {

    const value =

        document.getElementById("searchBox")

        .value

        .toLowerCase();

    const rows =

        document.querySelectorAll("#historyTable tr");

    rows.forEach(row => {

        row.style.display =

            row.innerText

            .toLowerCase()

            .includes(value)

            ? ""

            : "none";

    });

});