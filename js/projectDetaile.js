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
    // let projects = JSON.parse(localStorage.getItem("projects"));
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
    // projects.members.push(newMember);
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

// NÚT HỦY KHI THÊM THÀNH VIÊN
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
document.getElementById("showMember").addEventListener("click", function (event) {
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
document.querySelector(".show30").addEventListener("click", function (event) {
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





// NÚT BẤM THÊM SỬA NHIỆM VỤ
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
const projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
if (projectManagement && projectManagement.members) {
    // Lấy phần tử <select> để thêm các lựa chọn
    const selectElement = document.getElementById("inputPersonInCharge");

    // Duyệt qua các thành viên và tạo các option tương ứng
    projectManagement.members.forEach(member => {
        const option = document.createElement("option");
        let avartaName = member.email.split('@')[0];

        option.value = avartaName; // Giá trị của option là tên thành viên
        option.textContent = avartaName; // Nội dung của option là tên thành viên
        selectElement.appendChild(option); // Thêm option vào <select>
    });
}

// SỰ KIỆN LƯU
document.getElementById("task3Save").addEventListener("click", function (event) {
    event.preventDefault();

    // Lấy giá trị từ các trường trong form
    const updateTaskFail = document.getElementById("updateTaskFail");
    const taskName = document.getElementById("updateTask").value;
    const personInCharge = document.getElementById("inputPersonInCharge").value + "@gmail.com";
    const status = document.getElementById("inputStatus").value;
    const assignDate = document.getElementById("inputAssignDate").value;
    const dueDate = document.getElementById("inputDueDate").value;
    const priority = document.getElementById("inputPriority").value;
    const progress = document.getElementById("inputProgress").value;

    // Kiểm tra nếu có trường dữ liệu thiếu
    if (!taskName || !personInCharge || !status || !assignDate || !dueDate || !priority || !progress) {
        updateTaskFail.style.visibility = "visible"; // Hiển thị thông báo lỗi nếu có trường dữ liệu thiếu
        return; // Dừng thực thi nếu có trường dữ liệu bị bỏ trống
    }

    // Kiểm tra nếu taskName bị trùng
    const members = projectManagement.members || [];

    // Tìm userId của người phụ trách từ members
    const assignee = members.find(member => member.email === personInCharge);
    if (!assignee) {
        console.error("Không tìm thấy người phụ trách trong danh sách thành viên.");
        return;
    }
    const assigneeId = assignee.userId;  // Lấy userId của người phụ trách

    // Lấy projectId từ projectManagement.id
    const projectId = projectManagement.id;

    // Lấy danh sách nhiệm vụ hiện tại từ localStorage (hoặc tạo mảng trống nếu chưa có)
    let tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];

    // Nếu chưa có nhiệm vụ nào, gán taskId = 0, nếu có thì lấy taskId từ localStorage
    let taskId = tasksMission.length === 0 ? 0 : parseInt(localStorage.getItem("taskId") || "0");

    // Tăng taskId lên 1 sau khi tạo nhiệm vụ mới
    taskId += 1;

    // Lưu taskId mới vào localStorage để tăng cho lần tiếp theo
    localStorage.setItem("taskId", taskId);

    // Kiểm tra trùng lặp nhiệm vụ
    let taskExists = tasksMission.some(task => task.taskName === taskName); // Kiểm tra nếu nhiệm vụ đã tồn tại
    if (taskExists) {
        updateTaskFail.style.visibility = "visible"; // Hiển thị thông báo lỗi nếu tên nhiệm vụ đã tồn tại
        document.getElementById("updateTask").style.border = "1px solid red"; // Thêm border đỏ vào input taskName
        return;
    }

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

    // Thêm nhiệm vụ mới vào danh sách
    tasksMission.push(task);

    // Lưu lại vào localStorage
    localStorage.setItem("tasks", JSON.stringify(tasksMission));

    // Log dữ liệu đã lưu vào localStorage
    console.log("Dữ liệu nhiệm vụ đã lưu:", task);

    // Đóng modal
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none";

    // Ẩn thông báo lỗi và làm lại các thay đổi
    updateTaskFail.style.visibility = "hidden";
    document.getElementById("updateTask").style.border = ""; // Xóa border đỏ khi hoàn thành

    // Reset tất cả các trường input về giá trị mặc định
    document.getElementById("updateTask").value = "";
    document.getElementById("inputPersonInCharge").value = "";
    document.getElementById("inputStatus").value = "";
    document.getElementById("inputAssignDate").value = "";
    document.getElementById("inputDueDate").value = "";
    document.getElementById("inputPriority").value = "";
    document.getElementById("inputProgress").value = "";
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






// ĐỔ NHIỆM VỤ VÀO BẢNG
function showTasksInTable(){
    let tableTask = document.querySelector(".showTasksInTable");
    tableTask.innerHTML = ""; // Xóa bảng cũ

    // Lấy dữ liệu nhiệm vụ từ localStorage
    let tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];

    // Lặp qua mảng nhiệm vụ và hiển thị thông tin
    tasksMission.forEach((task) => {
        let taskRow = `
            <div class="showTaskTable1">
                <div class="showTaskTable11">${task.taskName}</div>
                <div class="showTaskTable12">${task.assigneeId}</div>
                <div class="showTaskTable13">${task.assignDate}</div>
                <div class="showTaskTable14">${task.dueDate}</div>
                <div class="showTaskTable15">${task.priority}</div>
                <div class="showTaskTable16">${task.progress}</div>
                <div class="showTaskTable17">${task.status}</div>
            </div>
        `;
        tableTask.innerHTML += taskRow; // Thêm nhiệm vụ vào bảng
    });
}






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








