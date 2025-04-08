let clickLogin = document.getElementById("clickLogin").onclick = function (event) {
    event.preventDefault();
    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;

    let storedUsers = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng từ localStorage

    if (storedUsers.length === 0) {
        document.getElementById("gmailLoginErrorFail").style.display = "none";
        document.getElementById("passwordLoginFail").style.display = "none";
    }

    // Kiểm tra email và mật khẩu
    if (emailLogin.trim() === "") {
        document.getElementById("emailLogin").style.border = "2px solid red";
        document.getElementById("gmailLoginErrorLeaveBlank").style.display = "flex";
        document.getElementById("gmailLoginErrorFail").style.display = "none";
    } else {
        document.getElementById("emailLogin").style.border = "1px solid";
        document.getElementById("gmailLoginErrorLeaveBlank").style.display = "none";
    }

    if (passwordLogin.trim() === "") {
        document.getElementById("passwordLogin").style.border = "2px solid red";
        document.getElementById("passwordLoginLeaveBlank").style.display = "flex";
        document.getElementById("passwordLoginFail").style.display = "none";
    } else {
        document.getElementById("passwordLogin").style.border = "1px solid";
        document.getElementById("passwordLoginLeaveBlank").style.display = "none";
    }

    if (emailLogin.trim() !== "" && passwordLogin.trim() !== "") {
        // Kiểm tra nếu email và mật khẩu đúng
        let validUser = storedUsers.find(user => user.email === emailLogin && user.password === passwordLogin);

        if (validUser) {
            // Lưu thông tin người dùng vào sessionStorage (hoặc localStorage)
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            window.location.href = "../pages/projectManagement.html"; // Đăng nhập thành công
        } else {
            if (!validUser) {
                if (!storedUsers.find(user => user.email === emailLogin)) {
                    document.getElementById("emailLogin").style.border = "2px solid red";
                    document.getElementById("gmailLoginErrorFail").style.display = "block";
                    document.getElementById("gmailLoginErrorLeaveBlank").style.display = "none";
                }
                if (!storedUsers.find(user => user.password === passwordLogin)) {
                    document.getElementById("passwordLogin").style.border = "2px solid red";
                    document.getElementById("passwordLoginFail").style.display = "block";
                    document.getElementById("passwordLoginLeaveBlank").style.display = "none";
                }
            }
        }
    }
};
