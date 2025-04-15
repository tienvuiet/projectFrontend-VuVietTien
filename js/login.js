document.addEventListener("DOMContentLoaded", function() {
    // Xóa trạng thái đăng nhập khi tải trang
    localStorage.removeItem("isLoggedIn");

    const clickLogin = document.getElementById("clickLogin");
    if (clickLogin) {
        clickLogin.onclick = function(event) {
            event.preventDefault();

            // Lấy giá trị email và mật khẩu
            const emailLogin = document.getElementById("emailLogin").value.trim();
            const passwordLogin = document.getElementById("passwordLogin").value.trim();

            // Lấy danh sách người dùng từ localStorage
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

            // Lấy các phần tử thông báo lỗi
            const emailErrorBlank = document.getElementById("gmailLoginErrorLeaveBlank");
            const emailErrorFail = document.getElementById("gmailLoginErrorFail");
            const passwordErrorBlank = document.getElementById("passwordLoginLeaveBlank");
            const passwordErrorFail = document.getElementById("passwordLoginFail");

            // Reset trạng thái lỗi và viền
            const resetErrors = () => {
                document.getElementById("emailLogin").style.border = "1px solid";
                document.getElementById("passwordLogin").style.border = "1px solid";
                emailErrorBlank.style.display = "none";
                emailErrorFail.style.display = "none";
                passwordErrorBlank.style.display = "none";
                passwordErrorFail.style.display = "none";
            };

            resetErrors();

            // Kiểm tra email và mật khẩu
            let hasError = false;

            if (emailLogin === "") {
                document.getElementById("emailLogin").style.border = "2px solid red";
                emailErrorBlank.style.display = "flex";
                hasError = true;
            }

            if (passwordLogin === "") {
                document.getElementById("passwordLogin").style.border = "2px solid red";
                passwordErrorBlank.style.display = "flex";
                hasError = true;
            }

            if (!hasError) {
                // Kiểm tra nếu email và mật khẩu đúng
                const validUser = storedUsers.find(user => user.email === emailLogin && user.password === passwordLogin);

                if (validUser) {
                    // Lưu thông tin người dùng và trạng thái đăng nhập
                    localStorage.setItem("currentUser", JSON.stringify(validUser));
                    localStorage.setItem("isLoggedIn", "true");
                    window.location.href = "../pages/projectManagement.html"; // Đăng nhập thành công
                } else {
                    // Hiển thị lỗi nếu email hoặc mật khẩu sai
                    if (!storedUsers.find(user => user.email === emailLogin)) {
                        document.getElementById("emailLogin").style.border = "2px solid red";
                        emailErrorFail.style.display = "block";
                    }
                    if (!storedUsers.find(user => user.password === passwordLogin)) {
                        document.getElementById("passwordLogin").style.border = "2px solid red";
                        passwordErrorFail.style.display = "block";
                    }
                }
            }
        };
    }
});