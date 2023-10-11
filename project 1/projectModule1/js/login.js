function login() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email == "admin" && password == "admin") {
        window.location.href = "../adminPages/users.html"
        return;
    }
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            if (users[i].action == false) {
                alert("m da bi ban")
                return;
            }
            localStorage.setItem("userId", users[i].id)
            window.location.href = "../index.html"
        } else {
            document.querySelector("#errorMessenger").style.display = "block"

        }
    }
}
function logOut() {
    localStorage.removeItem("userId")
}
logOut();