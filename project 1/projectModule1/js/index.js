
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let productList = [
    {
        name: "Ai Cập",
        price: 5000000,
        id: 1947107,
        src: "./assets/aicap.jpg",
        stock: 15,
    },
    {
        name: "Đà Nẵng",
        price: 15000000,
        id: 19471124,
        src: "./assets/danang.jpg",
        stock: 19,
    },
    {
        name: "Anh Quốc",
        price: 12000000,
        id: 194710123,
        src: "./assets/england.jpg",
        stock: 11,
    },
    {
        name: "Nhật Bản",
        price: 9000000,
        id: 191237,
        src: "./assets/japan.jpg",
        stock: 13,
    },
    {
        name: "Pháp",
        price: 4000000,
        id: 1123107,
        src: "./assets/phap.jpg",
        stock: 17,
    },
    {
        name: "Singapore",
        price: 20000000,
        id: 194755677,
        src: "./assets/singapore.jpg",
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
        <div class="container__product--item">
        <img src="${productList[i].src}" alt="">
        <p>${productList[i].name}</p>
        <p>price :${VND.format(productList[i].price)}</p>
        <!-- Button trigger modal -->
        <button class="button2" onclick="addToCart(${productList[i].id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            mua gói
          </button>
        <button class="button2" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" >chi tiết</button>
      </div>
        `
    }
    document.getElementsByClassName("container__product")[0].innerHTML = text
}
renderProduct(products);
function addToCart(productId) {
    let checkLogin = localStorage.getItem("userId")
    let users = JSON.parse(localStorage.getItem("users"))
    let products = JSON.parse(localStorage.getItem("productList"))
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < products.length; j++) {
                    if (products[j].id == productId) {
                        let result = users[i].cart.filter((item) => {
                            return item.id == productId;
                        })
                        if (result.length == 0) {
                            users[i].cart.push({ ...products[j], quantity: 1 });
                            localStorage.setItem("users", JSON.stringify(users))
                        } else {
                            for (let k = 0; k < users[i].cart.length; k++) {
                                if (users[i].cart[k].id == productId) {
                                    users[i].cart[k].quantity = ++users[i].cart[k].quantity;
                                    localStorage.setItem("users", JSON.stringify(users));
                                    showCount();
                                    break;
                                }
                            }
                        }
                    }
                }
                console.log("gio hang", users[i].cart);
            }
        }
    } else {
        alert("dki di")
    }
} function showCount() {
    let checkLogin = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                //users[i].cart
                let count = 0;
                for (let j = 0; j < users[i].cart.length; j++) {
                    count += users[i].cart[j].quantity;
                }
                document.getElementsByClassName("count")[0].innerHTML = count;
            }
        }

    }
}
showCount();

function search() {
    let inputValue = document.getElementById("search1").value;
    let result = products.filter((item) => {
        return item.name.indexOf(inputValue) != -1;
    })
    if (result.length != 0) {
        renderProduct(result);
    } else {
        renderProduct();
    }
}
function renderName() {
    let checkLogin = localStorage.getItem('userId');
    let users = JSON.parse(localStorage.getItem('users'));
    if (checkLogin && checkLogin.length > 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                document.getElementsByClassName('container__login')[0].innerHTML =
                    `
                <div class="loginName">
                <ul>
                <li><span class="material-symbols-outlined">
                person
                </span> ${users[i].name}</li>
                </li>
                <li><a href="./pages/login.html"><span class="material-symbols-outlined">
                logout
                </span></a>
                    </li>
            </ul>
            </div>
                `
            }
        }
    } else {
        document.getElementsByClassName('container__login')[0].innerHTML = `
        <div class="container__login">
            <li><a href="./pages/login.html"><span class="material-symbols-outlined">
                  login
                </span><br>Login</a></li>
            <li><a href="./pages/register.html">Register</a></li>
          </div>
          `
    }
}
renderName()
