function uuid() {
    return Math.floor(Math.random() * 734738483784);
}
let users = JSON.parse(localStorage.getItem("users")) || [];
function register() {

    let mail = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let admin = {
        email: "quychau10a3@gmail.com",
        password: "quychau123"
    }
    let obj = {
        email: mail,
        name: name,
        password: password,
        id: uuid(),
        cart: [],
        role: `custumer`,
        action: true
    }
    let check = users.filter((item) => {
        return item.email == mail
    })
    if (check.length == 0) {
        // tức là tài khoản chưa được đăng kí
        // trước khi push phải kiểm tra xem password có trùng confirm hay không
        if (confirmPassword != password) {
            // alert("mật khẩu không khớp!")
            document.getElementsByClassName("error")[0].style.display = "block";
        } else {
            document.getElementsByClassName("error")[0].style.display = "none";
            users.push(obj);
            localStorage.setItem("users", JSON.stringify(users));
            //khi đăng kí thành công chuyển sang trang đăng nhập
            window.location.href = "../pages/login.html"
        }
    } else {
        alert("tài khoản đã tồn tại!")
    }
}
const passwordField = document.querySelector("#password");
function switchVisibility() {
    if (passwordField.getAttribute("type") === "password") {
        passwordField.setAttribute("type", "text")
    } else {
        passwordField.setAttribute("type", "password")
    }
}
const confirmField = document.querySelector("#confirmPassword")
function switchVisibility1() {
    if (confirmField.getAttribute("type") === "password") {
        confirmField.setAttribute("type", "text")
    } else {
        confirmField.setAttribute("type", "password")
    }
}