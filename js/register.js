document.querySelector(".formRegister").onsubmit = function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của form (submit)

    // Kiểm tra tên người dùng
    let nameRegister = document.getElementById("nameRegister");
    let namRegister = nameRegister.value;
    let nameRegister2 = document.getElementById("nameRegister2");

    if (namRegister.trim() === "") {
        nameRegister2.style.display = "block";
        nameRegister.style.border = "2px solid red"; 
    } else {
        nameRegister2.style.display = "none";
        nameRegister.style.border = "1px solid"; 
    }
    // Kiểm tra email
    let emailRegister = document.getElementById("emailRegister").value;
    let emailRegister2 = document.getElementById("emailRegister2");

    if (emailRegister.trim() === "") {
        emailRegister2.style.display = "block";
        document.getElementById("emailRegister").style.border = "2px solid red"; 
    } else {
        emailRegister2.style.display = "none";
        document.getElementById("emailRegister").style.border = "1px solid"; 
    }
    // Kiểm tra mật khẩu
    let passwordRegister = document.getElementById("passwordRegister").value;
    let passwordRegister2 = document.getElementById("passwordRegister2");

    if (passwordRegister.trim() === "") {
        passwordRegister2.style.display = "block";
        document.getElementById("passwordRegister").style.border = "2px solid red";
    } else {
        passwordRegister2.style.display = "none";
        document.getElementById("passwordRegister").style.border = "1px solid"; 
    }
    // Kiểm tra mật khẩu xác nhận
    let checkPasswordRegister = document.getElementById("checkPasswordRegister").value;
    let checkPasswordRegister2 = document.getElementById("checkPasswordRegister2");

    if (checkPasswordRegister.trim() === "" || checkPasswordRegister.trim() !== passwordRegister.trim()) {
        checkPasswordRegister2.style.display = "block";
        document.getElementById("checkPasswordRegister").style.border = "2px solid red"; 
    } else {
        checkPasswordRegister2.style.display = "none";
        document.getElementById("checkPasswordRegister").style.border = "1px solid"; 
    }
    // Kiểm tra tất cả các trường hợp nếu hợp lệ
    if (namRegister.trim() !== "" && emailRegister.trim() !== "" && passwordRegister.trim() !== "" && checkPasswordRegister.trim() === passwordRegister.trim()) {
        localStorage.setItem("userName", namRegister);
        localStorage.setItem("userEmail", emailRegister);
        localStorage.setItem("userPassword", passwordRegister);
        alert("Đăng ký thành công!");
        window.location.href = "../pages/login.html";
    }
};
