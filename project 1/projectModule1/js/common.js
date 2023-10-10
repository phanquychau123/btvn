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
        document.getElementsByClassName('container__login')[0].innerHTML = 
        `
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