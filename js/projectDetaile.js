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














// NÚT BẤM THÊM SỬA NHIỆM VỤ
document.getElementById("addMission").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "flex";

    // Đây là thêm mới, không phải sửa nên cần clear dữ liệu và bỏ `data-task-id`
    modalErase.removeAttribute("data-task-id");
    document.getElementById("updateTask").value = "";
    document.getElementById("inputPersonInCharge").value = "";
    document.getElementById("inputStatus").value = "";
    document.getElementById("inputAssignDate").value = "";
    document.getElementById("inputDueDate").value = "";
    document.getElementById("inputPriority").value = "";
    document.getElementById("inputProgress").value = "";
});

// Gắn sự kiện vào tbody cha duy nhất (showTasksInTable)
document.querySelector(".showTasksInTable").addEventListener("click", function (event) {
    if (event.target.matches(".editMission"))  {
        handleEditTask(event);
    } else if (event.target.matches(".deleteMission")) {
        handleDeleteTask(event);
    }
});

//NÚT SỬA



// Hàm xử lý sự kiện sửa nhiệm vụ
function handleEditTask(event) {
    event.preventDefault();
    let taskRow = event.target.closest("tr");

    if (!taskRow) {
        console.error("Không tìm thấy dòng nhiệm vụ");
        return;
    }

    let taskName = taskRow.children[0].innerText;
    let personInCharge = taskRow.children[1].innerText.replace('@gmail.com', '');
    let priority = taskRow.children[2].innerText;
    let assignDate = taskRow.children[3].innerText;
    let dueDate = taskRow.children[4].innerText;
    let progress = taskRow.children[5].innerText;
    let status = taskRow.getAttribute("data-status");

    document.getElementById("updateTask").value = taskName;
    document.getElementById("inputPersonInCharge").value = personInCharge;
    document.getElementById("inputPriority").value = priority;
    document.getElementById("inputAssignDate").value = assignDate;
    document.getElementById("inputDueDate").value = dueDate;
    document.getElementById("inputProgress").value = progress;
    document.getElementById("inputStatus").value = status;

    document.querySelector(".add-editTask").setAttribute("data-task-id", taskRow.getAttribute("data-task-id"));

    document.querySelector(".add-editTask").style.display = "flex";
}
//NÚT XÓA
// Sử dụng event delegation để xử lý sự kiện xóa trên tất cả các phần tử nhiệm vụ
// Sử dụng event delegation để xử lý sự kiện xóa trên tất cả các phần tử nhiệm vụ


// Thêm sự kiện xoá động
document.addEventListener('click', function (event) {
    if (event.target.matches('.deleteMission')) {
        const taskRow = event.target.closest('tr');
        const taskId = taskRow.dataset.taskId;

        if (!taskId) {
            console.error('Không tìm thấy taskId.');
            return;
        }

        if (confirm('Bạn chắc chắn muốn xóa nhiệm vụ này?')) {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(task => task.id !== parseInt(taskId));
            localStorage.setItem('tasks', JSON.stringify(tasks));

            taskRow.remove();  // Xóa trực tiếp hàng đó khỏi giao diện
        }
    }
});
// TẠO OPTION CỦA SELECT THÀNH VIÊN
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

    const modalErase = document.querySelector(".add-editTask");
    const editingTaskId = modalErase.getAttribute("data-task-id");

    let tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];

    const taskName = document.getElementById("updateTask").value.trim();
    const personInCharge = document.getElementById("inputPersonInCharge").value.trim();
    const status = document.getElementById("inputStatus").value.trim();
    const assignDate = document.getElementById("inputAssignDate").value.trim();
    const dueDate = document.getElementById("inputDueDate").value.trim();
    const priority = document.getElementById("inputPriority").value.trim();
    const progress = document.getElementById("inputProgress").value.trim();

    // kiểm tra trống
    if (!taskName || !personInCharge || !status || !assignDate || !dueDate || !priority || !progress) {
        document.getElementById("updateTaskFail").style.visibility = "visible";
        return;
    } else {
        document.getElementById("updateTaskFail").style.visibility = "hidden";
    }

    if (editingTaskId) {
        const taskIndex = tasksMission.findIndex(task => task.id === parseInt(editingTaskId));
        if (taskIndex !== -1) {
            tasksMission[taskIndex] = {
                ...tasksMission[taskIndex],
                taskName,
                personInCharge: personInCharge + "@gmail.com",
                assignDate,
                dueDate,
                priority,
                progress,
                status,
            };
        }
    } else {
        let taskId = parseInt(localStorage.getItem("taskId") || "0") + 1;
        localStorage.setItem("taskId", taskId);
        tasksMission.push({
            id: taskId,
            taskName,
            personInCharge: personInCharge + "@gmail.com",
            assignDate,
            dueDate,
            priority,
            progress,
            status,
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasksMission));

    modalErase.removeAttribute("data-task-id");
    modalErase.style.display = "none";

    document.getElementById("updateTask").value = "";
    document.getElementById("inputPersonInCharge").value = "";
    document.getElementById("inputStatus").value = "";
    document.getElementById("inputAssignDate").value = "";
    document.getElementById("inputDueDate").value = "";
    document.getElementById("inputPriority").value = "";
    document.getElementById("inputProgress").value = "";

    updateTable(tasksMission);
});


function toggleSection(section) {
    let sectionElement = document.querySelector(`.${section}-section`);

    if (!sectionElement) {
        console.error(`Không tìm thấy phần tử có class: ${section}-section`);
        return;
    }

    if (sectionElement.style.display === "none" || sectionElement.style.display === "") {
        sectionElement.style.display = "table-row-group";
    } else {
        sectionElement.style.display = "none";
    }
}
//HÀM CẬP NHẬT BẢNG
// Hàm cập nhật bảng với các nhiệm vụ còn lại
function updateTable(tasksMission) {
    const todoSection = document.querySelector(".todo-section");
    const inProgressSection = document.querySelector(".inProgress-section");
    const pendingSection = document.querySelector(".pending-section");
    const doneSection = document.querySelector(".done-section");

    // Clear các section trước khi thêm lại dữ liệu
    todoSection.innerHTML = "";
    inProgressSection.innerHTML = "";
    pendingSection.innerHTML = "";
    doneSection.innerHTML = "";

    tasksMission.forEach(task => {
        const taskRow = `
        <tr data-task-id="${task.id}" data-status="${task.status}">
            <td>${task.taskName}</td>
            <td>${task.personInCharge}</td>
            <td><span class="badge ${getPriorityBadgeClass(task.priority)}">${task.priority}</span></td>
            <td>${task.assignDate}</td>
            <td>${task.dueDate}</td>
            <td><span class="badge ${getProgressBadgeClass(task.progress)}">${task.progress}</span></td>
            <td>
                 <button class="editMission">Sửa</button>
                <button class="deleteMission">Xóa</button>
            </td>
        </tr>`;

        switch (task.status) {
            case "To do":
                todoSection.innerHTML += taskRow; break;
            case "In Progress":
                inProgressSection.innerHTML += taskRow; break;
            case "Pending":
                pendingSection.innerHTML += taskRow; break;
            case "Done":
                doneSection.innerHTML += taskRow; break;
        }
    });
}


window.addEventListener('load', function () {
    const tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];
    updateTable(tasksMission);  // Cập nhật bảng với dữ liệu từ localStorage
});
// Hàm để lấy class CSS cho mức độ ưu tiên
function getPriorityBadgeClass(priority) {
    switch (priority) {
        case "Thấp": return "bg-success";
        case "Trung bình": return "bg-warning";
        case "Cao": return "bg-danger";
        default: return "";
    }
}

// Hàm để lấy class CSS cho tiến độ
function getProgressBadgeClass(progress) {
    switch (progress) {
        case "Đúng tiến độ": return "bg-success";
        case "Có rủi ro": return "bg-warning";
        case "Trễ hạn": return "bg-danger";
        default: return "";
    }
}

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








