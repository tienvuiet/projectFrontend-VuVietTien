const tasks = [
    {
        id: 1,
        taskName: `Soạn thảo đề cương dự án `,
        assigneeId: 1,
        projectId: 1,
        assignDate: `2025-03-24`,
        dueDate: `2025-03-26`,
        priority: `Thấp`,
        progress: `Đúng tiến độ`,
        status: "To do",
    },
]


// LỒNG PHẦN TIÊU ĐỀ
let addTitle = document.querySelector(".left2");
function showTitle() {
    // Kiểm tra nếu dự án tồn tại
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    if (projectManagement) {
        // Tạo HTML để hiển thị tên và mô tả dự án
        let addcart = `
            <h2>${projectManagement.projectName}</h2>
            <p>${projectManagement.description}</p>
        `;
        addTitle.innerHTML = addcart; // Hiển thị tên và mô tả vào phần tử có class "left2"
    }
}
// Gọi hàm khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function () {
    showTitle();
});







// THÊM THÀNH VIÊN
document.getElementById("add3Save").addEventListener("click", function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của sự kiện (ngừng việc gửi form)
    
    // Lấy dữ liệu dự án từ localStorage, nếu không có thì khởi tạo mảng members
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    
    // Lấy giá trị từ các trường trong form
    let newEmail = document.getElementById("emailMember").value.trim(); // Lấy giá trị email từ trường input có id "emailMember"
    let newRole = document.getElementById("role").value.trim(); // Lấy giá trị vai trò từ trường input có id "role"
    let emailMemberFail = document.getElementById("emailMemberFail");
    let emailFail = document.getElementById("emailFail");
    let roleFail = document.getElementById("roleFail");
    
    // Kiểm tra email trống và độ dài
    if (newEmail === "") {
        emailFail.style.visibility = "visible";
        document.getElementById("emailMember").style.border = "1px solid red";
        return; // Dừng lại không thực hiện thêm thành viên
    } else if (newEmail.length < 10 || newEmail.length > 50) {
        emailFail.style.visibility = "visible";
        document.getElementById("emailMember").style.border = "1px solid red";
        return;
    } else {
        emailFail.style.visibility = "hidden";
        document.getElementById("emailMember").style.border = "";
    }

    // Kiểm tra vai trò trống và độ dài
    if (newRole === "") {
        roleFail.style.visibility = "visible";
        document.getElementById("role").style.border = "1px solid red";
        return; // Dừng lại không thực hiện thêm thành viên
    } else if (newRole.length < 10 || newRole.length > 50) {
        roleFail.style.visibility = "visible";
        document.getElementById("role").style.border = "1px solid red";
        return;
    } else {
        roleFail.style.visibility = "hidden";
        document.getElementById("role").style.border = "";
    }

    // Kiểm tra trùng email
    const duplicateEmail = projectManagement.members.some(member =>
        member.email.toLowerCase() === newEmail.toLowerCase()
    );

    if (duplicateEmail) {
        emailMemberFail.style.visibility = "visible"; // Hiển thị thông báo lỗi nếu email trùng
        document.getElementById("emailMember").style.border = "1px solid red"; // Đổi màu border trường email
        return; // Dừng lại không thực hiện thêm thành viên
    } else {
        emailMemberFail.style.visibility = "hidden"; // Ẩn thông báo lỗi nếu email hợp lệ
        document.getElementById("emailMember").style.border = ""; // Đặt lại border của trường email
    }

    // Tự động tăng userId dựa trên số lượng thành viên hiện tại
    let newUserId = projectManagement.members.length + 1;

    // Tạo đối tượng thành viên mới
    let newMember = {
        userId: newUserId, // Gán userId cho thành viên mới
        email: newEmail,   // Gán email cho thành viên mới
        role: newRole      // Gán vai trò cho thành viên mới
    };

    // Thêm thành viên mới vào mảng members của dự án
    projectManagement.members.push(newMember);

    // Cập nhật lại thông tin dự án trong localStorage
    localStorage.setItem("projectManagement", JSON.stringify(projectManagement));
    
    // Reset form: ẩn modal và làm sạch giá trị trong form
    document.querySelector(".addMember").style.display = "none"; // Đóng modal
    document.getElementById("emailMember").value = ""; // Reset giá trị email
    document.getElementById("role").value = ""; // Reset giá trị role
    avatarMember();  
});
document.getElementById("addMember").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "flex";
});
document.getElementById("add3Cancel").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none";

    // Reset tất cả các ô input về mặc định
    document.getElementById("emailMember").value = ""; // Reset trường email
    document.getElementById("role").value = ""; // Reset trường vai trò
    
    // Ẩn các thông báo lỗi nếu có
    document.getElementById("emailMemberFail").style.visibility = "hidden";
    document.getElementById("emailFail").style.visibility = "hidden";
    document.getElementById("roleFail").style.visibility = "hidden";
    
    // Đặt lại border của các ô input
    document.getElementById("emailMember").style.border = "";
    document.getElementById("role").style.border = "";
});
document.getElementById("outAdd1").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none";
});




// SHOW THÀNH VIÊN
document.getElementById("showMember").addEventListener("click", function(event) {
    event.preventDefault();
    let showTableMemberElement = document.querySelector(".showMember");

    showTableMemberElement.style.display = "flex";
    showTableMember();
});
document.getElementById("outShowMember").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none";
});
document.getElementById("closeShow4").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none";
});
document.getElementById("saveShow4").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none";
});




// HIỂN THỊ THÀNH VIÊN TRONG BẢNG
function showTableMember() {
    let tableMember = document.querySelector(".show30");
    tableMember.innerHTML = ""; // Xóa bảng cũ
    // Lấy dữ liệu từ localStorage
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    // Lặp qua mảng members và hiển thị thông tin
    
    projectManagement.members.forEach((member) => {
        let avartaName = member.email.split('@')[0]; // Lấy phần trước dấu '@' trong email
        let avarta = member.email.slice(0, 2).toUpperCase(); // Lấy 2 ký tự đầu làm avatar
        let mailMember = member.email;
        let addTableMember = `
            <div class="show3">
                <div class="show31">
                    <div id="avartaShow31">${avarta}</div>
                    <div>
                        <p class="nameShow31">${avartaName}</p>
                        <p class="emailShow31">${mailMember}</p>
                    </div>
                </div>
                <div class="show32">
                    <div class="role">${member.role}</div>
                    <img class="garbageShow32" src="../assets/Trash.png" alt="" class="deleteMember">
                </div>
            </div>
        `;
        tableMember.innerHTML += addTableMember; // Thêm thành viên vào bảng
    });
}


// HIỂN THỊ AVATAR THÀNH VIÊN
function avatarMember() {
    let addAvartarMember = document.querySelector(".memberTable2");
    addAvartarMember.innerHTML = ""; // Xóa nội dung cũ

    // Kiểm tra sự tồn tại của projectManagement trong localStorage
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    
    if (!projectManagement || !projectManagement.members || projectManagement.members.length === 0) {
        addAvartarMember.style.display = "none"; // Ẩn phần tử nếu không có thành viên
        return;
    }
    let membersToShow = projectManagement.members.slice(0, 2);

    addAvartarMember.style.display = "flex"; 

    // Lặp qua các thành viên để hiển thị
    membersToShow.forEach((member) => {
        let avarta = member.email.slice(0, 2).toUpperCase(); // Lấy 2 ký tự đầu của email làm avatar
        let avartaName = member.email.split('@')[0]; // Lấy phần trước dấu '@' trong email
        let addCartMember = `
        <div class="user">
            <div class="user1">
                <p>${avarta}</p> <!-- Hiển thị avatar từ email -->
            </div>
            <div class="position">
                <p>${avartaName}</p> <!-- Hiển thị tên người dùng từ email -->
                <p>${member.role}</p> <!-- Hiển thị vai trò của thành viên -->
            </div>
        </div>
        `;
        addAvartarMember.innerHTML += addCartMember; // Thêm thành viên vào danh sách
    });
}
avatarMember()





// HÀM XÓA THÀNH VIÊN
document.querySelector(".show30").addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("garbageShow32")) {
        // Lấy email của thành viên cần xóa
       
        let memberEmail = event.target.closest('.show3').querySelector('.emailShow31').innerText;

        // Lấy dữ liệu từ localStorage
        let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
        
        // Lọc ra thành viên cần xóa khỏi mảng
        let updatedMembers = projectManagement.members.filter(member => member.email !== memberEmail);
        
        // Cập nhật lại mảng members trong projectManagement
        projectManagement.members = updatedMembers;
        
        // Lưu lại dữ liệu mới vào localStorage
        localStorage.setItem("projectManagement", JSON.stringify(projectManagement));

        // Gọi lại hàm hiển thị thành viên
        showTableMember(); // Cập nhật lại bảng thành viên
        avatarMember();  
    }
});









function toggleSection(section) {
    let sectionElement = document.querySelector(`.${section}-section`);
    let openIcon = document.getElementById("open");
    let closeIcon = document.getElementById("close");

    if (sectionElement.style.display === "none" || sectionElement.style.display === "") {
        sectionElement.style.display = "table-row"; // Hiển thị phần mục
        openIcon.style.visibility = "visible"; // Hiển thị biểu tượng mở
        closeIcon.style.visibility = "hidden";  // Ẩn biểu tượng đóng
        
    } else {
        sectionElement.style.display = "none"; // Ẩn phần mục
        openIcon.style.visibility = "hidden";  // Ẩn biểu tượng mở
        closeIcon.style.visibility = "visible"; // Hiển thị biểu tượng đóng
    }
}





// THÊM SỬA NHIỆM VỤ
document.getElementById("addMission").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "flex";
});
document.querySelectorAll(".editMission").forEach(function (editButton) {
    editButton.addEventListener("click", function (event) {
        event.preventDefault();
        let modalErase = document.querySelector(".add-editTask");
        modalErase.style.display = "flex";
    });
});

// LƯU NHIỆM VỤ
// Lấy thông tin projectManagement từ localStorage
const projectManagement = JSON.parse(localStorage.getItem("projectManagement"));

if (projectManagement && projectManagement.members) {
    // Tạo các lựa chọn trong dropdown từ projectManagement.members
    const selectElement = document.getElementById("inputPersonInCharge");

    projectManagement.members.forEach(member => {
        const option = document.createElement("option");
        option.value = member.name; // Tên người phụ trách
        option.textContent = member.name; // Hiển thị tên người phụ trách
        selectElement.appendChild(option);
    });
} else {
    console.error("Không tìm thấy thông tin projectManagement hoặc danh sách thành viên trong localStorage.");
}

// Lắng nghe sự kiện khi nhấn nút Lưu
document.getElementById("task3Save").addEventListener("click", function (event) {
    event.preventDefault();

    // Lấy giá trị từ các trường trong form
    const taskName = document.getElementById("updateTask").value;
    const personInCharge = document.getElementById("inputPersonInCharge").value;
    const status = document.getElementById("inputStatus").value;
    const assignDate = document.getElementById("inputAssignDate").value;
    const dueDate = document.getElementById("inputDueDate").value;
    const priority = document.getElementById("inputPriority").value;
    const progress = document.getElementById("inputProgress").value;

    // Lấy thông tin projectManagement từ localStorage
    const members = projectManagement.members || [];

    // Tìm userId của người phụ trách từ members
    const assignee = members.find(member => member.name === personInCharge);
    if (!assignee) {
        console.error("Không tìm thấy người phụ trách trong danh sách thành viên.");
        return;
    }
    const assigneeId = assignee.userId;  // Lấy userId của người phụ trách

    // Lấy projectId từ projectManagement.id
    const projectId = projectManagement.id;

    // Lấy taskId từ localStorage và tự động tăng lên
    let taskId = parseInt(localStorage.getItem("taskId") || "0") + 1;  // Nếu chưa có taskId thì bắt đầu từ 1

    // Lưu taskId mới vào localStorage để tăng cho lần tiếp theo
    localStorage.setItem("taskId", taskId);

    // Tạo đối tượng nhiệm vụ
    const task = {
        id: taskId, // Sử dụng taskId tự động tăng
        taskName: taskName,
        assigneeId: assigneeId, // Gán assigneeId là userId của người phụ trách
        projectId: projectId,  // Sử dụng projectId từ projectManagement
        assignDate: assignDate,
        dueDate: dueDate,
        priority: priority,
        progress: progress,
        status: status,
    };

    // Lấy danh sách nhiệm vụ hiện tại từ localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Thêm nhiệm vụ mới vào danh sách
    tasks.push(task);

    // Lưu lại vào localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Đóng modal
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none";
});



document.getElementById("outAddEdit").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none";
});
document.getElementById("task3Cancel").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none";
});












// ĐĂNG XUẤT
document.getElementById("logOut").addEventListener("click", function (event) {
    event.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure you want to log out?",
        text: "You won't be able to revert this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Logged out!",
                text: "You have successfully logged out.",
                icon: "success"
            }).then(() => {
                // Xóa thông tin đăng nhập trước đó
                localStorage.removeItem("currentUser");

                // Kiểm tra xem thông tin đã bị xóa chưa
                console.log(localStorage.getItem("currentUser"));  // Nếu trả về null, thông tin đã bị xóa

                // Chuyển hướng đến trang đăng nhập (login.html)
                window.location.href = "../pages/login.html";
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "You're still here :)",
                icon: "error"
            });
        }
    });
});
