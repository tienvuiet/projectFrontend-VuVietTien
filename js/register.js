 let users = [    
    {
        id: 1,  // Gán ID mới cho người dùng
        fullName: `Vũ Việt Tiến`,
        email: `tienvuviet@gmail.com`,
        password: `allain19012006`,

    },
 ]
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

    // Kiểm tra xem email đã tồn tại trong localStorage chưa
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];  // Lấy danh sách người dùng đã lưu trong localStorage
    let existingUser = storedUsers.find(user => user.email === emailRegister);

    if (emailRegister.trim() === "") {
        emailRegister2.style.display = "block";
        document.getElementById("emailRegister").style.border = "2px solid red"; 
    } else if (existingUser) {
        emailRegister2.innerText = "Email đã tồn tại!";
        emailRegister2.style.display = "block";
        document.getElementById("emailRegister").style.border = "2px solid red"; 
    } else {
        emailRegister2.style.display = "none";
        document.getElementById("emailRegister").style.border = "1px solid"; 
    }

    // Kiểm tra mật khẩu (tối thiểu 8 ký tự)
    let passwordRegister = document.getElementById("passwordRegister").value;
    let passwordRegister2 = document.getElementById("passwordRegister2");

    if (passwordRegister.trim() === "" || passwordRegister.length < 8) {
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
    if (namRegister.trim() !== "" && emailRegister.trim() !== "" && passwordRegister.trim() !== "" && passwordRegister.length >= 8 && checkPasswordRegister.trim() === passwordRegister.trim() && !existingUser) {
        
        // Tạo ID mới cho người dùng
        let newUserId = 1; // Mặc định ID là 1 nếu chưa có user nào trong localStorage
        
        // Lấy danh sách người dùng hiện tại trong localStorage (nếu có)
        users = JSON.parse(localStorage.getItem("users")) || [];

        // Nếu đã có người dùng, lấy ID lớn nhất và cộng 1 để tạo ID mới
        if (users.length > 0) {
            newUserId = Math.max(...users.map(user => user.id)) + 1;
        }

        // Tạo đối tượng người dùng mới
        let user = {
            id: newUserId,  // Gán ID mới cho người dùng
            fullName: namRegister,
            email: emailRegister,
            password: passwordRegister,
        };

        // Thêm người dùng mới vào danh sách và lưu vào localStorage
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users)); // Lưu lại danh sách người dùng

        alert("Đăng ký thành công!");
        window.location.href = "../pages/projectManagement.html"; // Điều hướng đến trang khác sau khi đăng ký thành công
    }
};
