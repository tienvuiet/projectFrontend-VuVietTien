let clickLogin = document.getElementById("clickLogin").onclick = function (event) {
    event.preventDefault();
    let emailLogin = document.getElementById("emailLogin").value;
    let passwordLogin = document.getElementById("passwordLogin").value;

    // Kiểm tra email và mật khẩu có đúng với tài khoản đã đăng ký trong localStorage
    let registeredEmail = localStorage.getItem("userEmail");
    let registeredPassword = localStorage.getItem("userPassword");

    // Kiểm tra nếu thông tin đăng nhập chưa được lưu trong LocalStorage
    if (!registeredEmail || !registeredPassword) {
        document.getElementById("gmailLoginErrorFail").style.display = "none"; // Ẩn thông báo sai email
        document.getElementById("passwordLoginFail").style.display = "none"; // Ẩn thông báo sai mật khẩu
    }

    // Kiểm tra email có trống không
    if (emailLogin.trim() === "") {
        document.getElementById("emailLogin").style.border = "2px solid red";
        document.getElementById("gmailLoginErrorLeaveBlank").style.display = "flex"; // Hiển thị thông báo "email không được bỏ trống"
        document.getElementById("gmailLoginErrorFail").style.display = "none"; // Ẩn thông báo "sai gmail"
    } else {
        document.getElementById("emailLogin").style.border = "1px solid";
        document.getElementById("gmailLoginErrorLeaveBlank").style.display = "none"; // Ẩn thông báo "email không được bỏ trống"
    }

    // Kiểm tra mật khẩu có trống không
    if (passwordLogin.trim() === "") {
        document.getElementById("passwordLogin").style.border = "2px solid red";
        document.getElementById("passwordLoginLeaveBlank").style.display = "flex"; // Hiển thị thông báo "mật khẩu không được bỏ trống"
        document.getElementById("passwordLoginFail").style.display = "none"; // Ẩn thông báo "sai mật khẩu"
    } else {
        document.getElementById("passwordLogin").style.border = "1px solid";
        document.getElementById("passwordLoginLeaveBlank").style.display = "none"; // Ẩn thông báo "mật khẩu không được bỏ trống"
    }
    // Kiểm tra nếu cả email và mật khẩu không trống mới thực hiện so sánh với dữ liệu trong localStorage
    if (emailLogin.trim() !== "" && passwordLogin.trim() !== "") {
        // Kiểm tra nếu email và mật khẩu đúng, thực hiện đăng nhập
        if (emailLogin === registeredEmail && passwordLogin === registeredPassword) {
            window.location.href = "../pages/projectManagement.html"; // Đăng nhập thành công
            
        } else {
            if (emailLogin !== registeredEmail) {
                document.getElementById("emailLogin").style.border = "2px solid red";
                document.getElementById("gmailLoginErrorFail").style.display = "block"; // Hiển thị thông báo "sai gmail"
                document.getElementById("gmailLoginErrorLeaveBlank").style.display = "none"; 
            }
            if (passwordLogin !== registeredPassword) {
                document.getElementById("passwordLogin").style.border = "2px solid red";
                document.getElementById("passwordLoginFail").style.display = "block";
                document.getElementById("passwordLoginLeaveBlank").style.display = "none"; // Hiển thị thông báo "sai mật khẩu"
            }
        }
    }
};
