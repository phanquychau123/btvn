function uuid() {
    return Math.floor(Math.random()*734738483784);
}
let users = JSON.parse(localStorage.getItem("users"))||[];
function register() {
  
    let mail=document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

   let obj={
    email:email,
    name:name,
    password: password,
    id:uuid(),
    cart:[],
    role : `admin`
   }
   let check= users.filter((item)=>{
    return item.email==mail
   })
   if(check.length==0){
    // tức là tài khoản chưa được đăng kí
    // trước khi push phải kiểm tra xem password có trùng confirm hay không
       if(confirmPassword  != password){
        // alert("mật khẩu không khớp!")
        document.getElementsByClassName("error")[0].style.display="block";
       }else{
           document.getElementsByClassName("error")[0].style.display = "none";
           users.push(obj);
           localStorage.setItem("users", JSON.stringify(users));
           //khi đăng kí thành công chuyển sang trang đăng nhập
           window.location.href = "../pages/login.html"
       }
   }else{
    alert("tài khoản đã tồn tại!")
   }
}