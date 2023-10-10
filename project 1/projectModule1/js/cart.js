const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function renderCart() {
    let checkLogin = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                let total = 0;
                let text = "";
                for (let j = 0; j < users[i].cart.length; j++) {
                    total += users[i].cart[j].price * users[i].cart[j].quantity;
                    text +=
                        `
                    <tr>
                <td>${j + 1}</td>
                <td>
                <img src=".${users[i].cart[j].src}"
                </td>
                <td>${users[i].cart[j].id}</td>
                <td>${users[i].cart[j].name}</td>
                <td>${VND.format(users[i].cart[j].price)}</td>
                <td>
                    <button class="button" onclick="reduce(${users[i].cart[j].id})">-</button>
                    ${users[i].cart[j].quantity}    
                    <button class="button" onclick = "increase(${users[i].cart[j].id})">+</button>
                </td>
                <td>${VND.format(users[i].cart[j].price * users[i].cart[j].quantity)}</td>
                <td><button  class="button" onclick="deleteCartItem(${j})"><span class="material-symbols-outlined">
                close
                </span></button></td>
            </tr>
                    `
                }
                document.getElementById("tbody").innerHTML =
                    `
                ${text}
                <tr>
                <td colspan ="6">tong gia san pham</td>
                <td colspan="2">${VND.format(total)}</td>
                </tr>
                `
            }

        }
    }
}
renderCart();
// function tang giam so luong san pham     
function increase(productId) {
    let checkLogin = localStorage.getItem("userId")
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j].id == productId) {
                        users[i].cart[j].quantity == ++users[i].cart[j].quantity;
                        localStorage.setItem("users", JSON.stringify(users))
                        renderCart()
                    }

                }
            }

        }
    }
}
function reduce(productId) {
    let checkLogin = localStorage.getItem("userId")
    let users = JSON.parse(localStorage.getItem("users"));
    if (checkLogin != null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id == checkLogin) {
                for (let j = 0; j < users[i].cart.length; j++) {
                    if (users[i].cart[j].id == productId) {
                        users[i].cart[j].quantity == --users[i].cart[j].quantity;
                        localStorage.setItem("users", JSON.stringify(users))
                        renderCart()
                    }

                }
            }

        }
    }
}
function deleteCartItem(index) {
    let checkLogin = localStorage.getItem("userId")
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == checkLogin) {
            users[i].cart.splice(index, 1)
            localStorage.setItem("users", JSON.stringify(users));
            renderCart();

        }
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