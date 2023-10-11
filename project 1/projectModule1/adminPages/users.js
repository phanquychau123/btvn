
function showUsers() {
    let users = JSON.parse(localStorage.getItem("users"))
    let text = "";
    for (let i = 0; i < users.length; i++) {
        text +=
            `
        <tr>
            <td>${i + 1}</td>
            <td>${users[i].id}</td>
            <td>${users[i].name}</td>
            <td>${users[i].email}</td>
            <td>${users[i].role}</td>
            <td><button onclick="blockUsers()">${users[i].action ? "block" : "unlock"}</button><button onclick="deleteUser(${users[i].id})">Xoa</button></td>
        </tr>
        `
    }
    document.getElementsByClassName("tbody")[0].innerHTML = text
}
showUsers()
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == index) {
            users.splice(i, 1)
            localStorage.removeItem("userId")
            localStorage.setItem("users", JSON.stringify(users))
            showUsers()
        }
    }
}
function blockUsers() {
    let loggedUser = JSON.parse(localStorage.getItem("userId"));
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        users[i].action = !users[i].action;
        localStorage.setItem("users", JSON.stringify(users));
        if (loggedUser == users[i].id) {
            localStorage.removeItem("userId")
        }
        showUsers()
    }
}
blockUsers()
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
showUsers()
let productList = [
    {
        name: "Ai Cập",
        price: 5000000,
        id: 1947107,
        src: "../assets/aicap.jpg",
        stock: 15,
    },
    {
        name: "Đà Nẵng",
        price: 15000000,
        id: 19471124,
        src: "../assets/danang.jpg",
        stock: 19,
    },
    {
        name: "Anh Quốc",
        price: 12000000,
        id: 194710123,
        src: "../assets/england.jpg",
        stock: 11,
    },
    {
        name: "Nhật Bản",
        price: 9000000,
        id: 191237,
        src: "../assets/japan.jpg",
        stock: 13,
    },
    {
        name: "Pháp",
        price: 4000000,
        id: 1123107,
        src: "../assets/phap.jpg",
        stock: 17,
    },
    {
        name: "Singapore",
        price: 20000000,
        id: 194755677,
        src: "../assets/singapore.jpg",
        stock: 10,
    },
]
localStorage.setItem("productList", JSON.stringify(productList));
let products = JSON.parse(localStorage.getItem("productList"));
function renderProduct(productList) {
    if (productList == undefined) {
        productList = []
    }
    let text = "";
    for (let i = 0; i < productList.length; i++) {
        text +=
            `
            <tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td><img src="${productList[i].src}" class="img1"</td>
            <td>${productList[i].price}</td>
            <td><button><span class="material-symbols-outlined">
            close
            </span></button></td>
        </tr>
        `
    }
    document.getElementsByClassName("tbody2")[0].innerHTML = text
}
renderProduct(products);
function addProduct() {
    let products = JSON.parse(localStorage.getItem("productList")) || [];
    let productName = document.getElementById("productName");
    let price = document.getElementById("price");
    // let id = document.getElementById("id");
    let src = document.getElementById("src");
    const selectedFile = document.getElementById("src").files[0].name;
    console.log(selectedFile);
    let product =
    {
        name: productName.value,
        price: price.value,
        id: uuid(),
        src: "../assets/images/" + selectedFile,
    };
    let check = products.filter((item) => {
        return item.name == productName.value;
    })
    if (check.length == 0) {
        products.push(product);
        localStorage.setItem("productList", JSON.stringify(products))
        showProduct();
    } else {
        alert("san pham da co trong danh sach")
    }
}