const tasks = [
    {
        id: 1,
        idProjectManagement: 1,
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
        addTitle.innerHTML = addcart; 
    }
}
//DOMContentLoaded: Cần thao tác với DOM ngay lập tức

document.addEventListener('DOMContentLoaded', function () {
    showTitle();
});



// let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));

// localStorage.setItem("projectManagement", JSON.stringify(projectManagement));






// THÊM THÀNH VIÊN- LƯU THÀNH VIÊN
document.getElementById("add3Save").addEventListener("click", function (event) {
    event.preventDefault();

    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    let newEmail = document.getElementById("emailMember").value.trim();
    let newRole = document.getElementById("role").value.trim();

    let emailMemberFail = document.getElementById("emailMemberFail");
    let emailFail = document.getElementById("emailFail");
    let roleFail = document.getElementById("roleFail");

    // Kiểm tra email trống
    if (newEmail === "") {
        emailFail.style.visibility = "visible";
        document.getElementById("emailMember").style.border = "1px solid red";
        document.querySelector(".addMember").style.display = "flex";
        return;
    }

    // Kiểm tra độ dài email
    if (newEmail.length < 10 || newEmail.length > 50) {
        emailFail.style.visibility = "visible";
        document.getElementById("emailMember").style.border = "1px solid red";
        document.querySelector(".addMember").style.display = "flex";
        return;
    } else {
        emailFail.style.visibility = "hidden";
        document.getElementById("emailMember").style.border = "";

        // Kiểm tra định dạng @gmail.com
        if (!newEmail.endsWith("@gmail.com")) {
            document.querySelector(".addMember").style.display = "none";
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email must be in @gmail.com format!!",
                footer: '<a href="#">Why i get this error?</a>'
            }).then(() => {
                document.querySelector(".addMember").style.display = "flex"; 
            });

            document.getElementById("emailMember").style.border = "1px solid red";
            return;
        }
    }

    // Kiểm tra role trống
    if (newRole === "") {
        roleFail.style.visibility = "visible";
        document.getElementById("role").style.border = "1px solid red";
        document.querySelector(".addMember").style.display = "flex";
        return;
    }

    // Kiểm tra độ dài role
    if (newRole.length < 10 || newRole.length > 50) {
        roleFail.style.visibility = "visible";
        document.getElementById("role").style.border = "1px solid red";
        document.querySelector(".addMember").style.display = "flex";
        return;
    } else {
        roleFail.style.visibility = "hidden";
        document.getElementById("role").style.border = "";
    }

    // Kiểm tra trùng email chỉ trong cùng một dự án
    const duplicateEmail = projectManagement.members.some(member =>
        member.email.toLowerCase() === newEmail.toLowerCase() &&
        member.idProjectDetaile === projectManagement.id // Chỉ kiểm tra email trong dự án hiện tại
    );

    if (duplicateEmail) {
        emailMemberFail.style.visibility = "visible";
        document.getElementById("emailMember").style.border = "1px solid red";
        document.querySelector(".addMember").style.display = "flex";
        return;
    } else {
        emailMemberFail.style.visibility = "hidden";
        document.getElementById("emailMember").style.border = "";
    }
    

    let currentMember = JSON.parse(localStorage.getItem("currentUser"));
    let newCurrentMember = {
        userID: currentMember.userID,
        email: currentMember.email,
        idProjectDetaile: projectManagement.id,
    }
    projectManagement.members.push(newCurrentMember);


    // Tạo userId mới
    let newUserId = projectManagement.members.length + 2;
   
    let newMember = {
        userId: newUserId,
        email: newEmail,
        role: newRole,
        idProjectDetaile: projectManagement.id, // Dùng id của dự án hiện tại
    };

    projectManagement.members.push(newMember);
    localStorage.setItem("projectManagement", JSON.stringify(projectManagement));

    // Reset form
    document.querySelector(".addMember").style.display = "none";
    document.getElementById("emailMember").value = "";
    document.getElementById("role").value = "";

    avatarMember(); // Cập nhật avatar sau khi thêm
    updatePersonInChargeOptions();
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

    // Lọc thành viên có idProjectDetaile trùng với projectManagement.id
    let filteredMembers = projectManagement.members.filter(member => member.idProjectDetaile === projectManagement.id);

    filteredMembers.forEach((member) => {
        let avartaName = member.email.split('@')[0]; // Lấy phần trước dấu '@' trong email
        //split chia email thành 2 phần, lấy phần đầu tiên làm tên hiển thị
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

    // Lọc ra các thành viên có idProjectDetaile trùng với projectManagement.id
    let membersToShow = projectManagement.members.filter(member => member.idProjectDetaile === projectManagement.id).slice(0, 2);

    // Kiểm tra nếu không có thành viên hợp lệ
    if (membersToShow.length === 0) {
        addAvartarMember.style.display = "none"; // Ẩn nếu không có thành viên phù hợp
        return;
    }

    addAvartarMember.style.display = "flex";

    // Lặp qua các thành viên để hiển thị
    membersToShow.forEach((member) => {
        let avarta = member.email.slice(0, 2).toUpperCase(); // Lấy 2 ký tự đầu của email làm avatar
        let avartaName = member.email.split('@')[0]; // Lấy phần trước dấu '@' trong email
        let addCartMember = `
            <div class="user">
                <div class="user1">
                    <p>${avarta}</p> 
                </div>
                <div class="position">
                    <p>${avartaName}</p>
                    <p>${member.role}</p> 
                </div>
            </div>
            `;
        addAvartarMember.innerHTML += addCartMember; // Thêm thành viên vào danh sách
    });
}
avatarMember();






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
    //Cập nhật danh sách người phụ trách 
    updatePersonInChargeOptions();
});

// Gắn sự kiện vào tbody cha duy nhất (showTasksInTable)
document.querySelector(".showTasksInTable").addEventListener("click", function (event) {
    if (event.target.matches(".editMission")) {
        handleEditTask(event);
    } else if (event.target.matches(".deleteMission")) {
        handleDeleteTask(event);
    }
});
//.matches() trả về true nếu phần tử hiện tại khớp với bộ chọn CSS mà bạn chỉ định, ngược lại sẽ trả về false.
//NÚT SỬA



// Hàm xử lý sự kiện sửa nhiệm vụ
function handleEditTask(event) {
    event.preventDefault();
    let taskRow = event.target.closest("tr");
//.target để xác định nút bấm vào
    const taskId = taskRow.getAttribute("data-task-id");
    //cụ thể là lấy id của tasks tương ứng 
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskData = allTasks.find(task => task.id === parseInt(taskId));


    document.getElementById("updateTask").value = taskData.taskName;
    document.getElementById("inputPersonInCharge").value = taskData.personInCharge.replace("@gmail.com", "");
    document.getElementById("inputPriority").value = taskData.priority;
    document.getElementById("inputAssignDate").value = taskData.assignDate; // assignDate gốc yyyy-mm-dd
    document.getElementById("inputDueDate").value = taskData.dueDate;       // dueDate gốc yyyy-mm-dd
    document.getElementById("inputProgress").value = taskData.progress;
    document.getElementById("inputStatus").value = taskData.status;

    document.querySelector(".add-editTask").setAttribute("data-task-id", taskId);
    document.querySelector(".add-editTask").style.display = "flex";
}

//NÚT XÓA



// Thêm sự kiện xoá động
document.addEventListener('click', function (event) {
    if (event.target.matches('.deleteMission')) {
        const taskRow = event.target.closest('tr');
        const taskId = taskRow.dataset.taskId;
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "You will definitely delete!",
            footer: '<a href="#">Why do I have this issue?</a>',
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
                tasks = tasks.filter(task => task.id !== parseInt(taskId));
                localStorage.setItem('tasks', JSON.stringify(tasks));

                taskRow.remove();  // Xóa trực tiếp hàng đó khỏi giao diện
            }
        });
    }
});


// TẠO OPTION CỦA SELECT THÀNH VIÊN
const projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
if (projectManagement && projectManagement.members) {
    // Lấy phần tử <select> để thêm các lựa chọn
    const selectElement = document.getElementById("inputPersonInCharge");

    // Lọc các thành viên có idProjectDetaile trùng với projectManagement.id
    const membersToShow = projectManagement.members.filter(member => member.idProjectDetaile === projectManagement.id);

    // Duyệt qua các thành viên đã lọc và tạo các option tương ứng
    membersToShow.forEach(member => {
        const option = document.createElement("option");
        let avartaName = member.email.split('@')[0];

        option.value = avartaName; // Giá trị của option là tên thành viên
        option.textContent = avartaName; // Nội dung của option là tên thành viên
        selectElement.appendChild(option); // Thêm option vào <select>
    });
}




//Cập nhật danh sách người phụ trách 
function updatePersonInChargeOptions() {
    const selectElement = document.getElementById("inputPersonInCharge");
    const projectManagement = JSON.parse(localStorage.getItem("projectManagement"));

    // Xóa tất cả các tùy chọn hiện tại
    selectElement.innerHTML = "";

    // Lọc các thành viên có idProjectDetaile trùng với projectManagement.id
    const membersToShow = projectManagement.members.filter(
        member => member.idProjectDetaile === projectManagement.id
    );

    // Thêm các tùy chọn mới
    membersToShow.forEach(member => {
        const option = document.createElement("option");
        let avartaName = member.email.split('@')[0];
        option.value = avartaName;
        option.textContent = avartaName;
        selectElement.appendChild(option);
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

    const currentProject = JSON.parse(localStorage.getItem("projectManagement"));

    // Ẩn tất cả các thông báo lỗi trước khi kiểm tra
    document.getElementById("updateTaskFail").style.visibility = "hidden";
    document.getElementById("emailMemberFail").style.visibility = "hidden";
    document.getElementById("roleFail").style.visibility = "hidden";
    document.getElementById("emailFail").style.visibility = "hidden";
    document.getElementById("inputAssignDate2").style.visibility = "hidden";
    document.getElementById("inputDueDate2").style.visibility = "hidden";

    // Kiểm tra không được để trống
    if (!taskName || !personInCharge || !status || !assignDate || !dueDate || !priority || !progress) {
        modalErase.style.display = "none";
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Do not leave any fields blank!",
            footer: '<a href="#">Omg?</a>'
        }).then((result) => {
            if (result.isConfirmed) {
                modalErase.style.display = "flex";
            }
        });
        return;
    }

    // Kiểm tra trùng tên chỉ với các nhiệm vụ có idProjectManagement trùng với dự án hiện tại
    const isDuplicateName = tasksMission.some(task =>
        task.taskName.trim().toLowerCase() === taskName.toLowerCase() &&
        task.id !== parseInt(editingTaskId) &&
        task.idProjectManagement === currentProject.id
    );

    if (isDuplicateName) {
        document.getElementById("updateTaskFail").style.visibility = "visible";
        return;
    }

    // Kiểm tra ngày bắt đầu lớn hơn ngày hiện tại
    const today = new Date();
    const startDate = new Date(assignDate);
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if (startDate <= today) {
        document.getElementById("inputAssignDate2").style.visibility = "visible";
        return;
    }

    // Kiểm tra hạn chót lớn hơn ngày bắt đầu
    const endDate = new Date(dueDate);
    endDate.setHours(0, 0, 0, 0);

    if (endDate <= startDate) {
        document.getElementById("inputDueDate2").style.visibility = "visible";
        return;
    }

    // Nếu hợp lệ thì thêm/sửa nhiệm vụ
    if (editingTaskId) {
        const taskIndex = tasksMission.findIndex(task => task.id === parseInt(editingTaskId));
        if (taskIndex !== -1) {
            tasksMission[taskIndex] = {
                ...tasksMission[taskIndex],
                //mở rộng hoặc sao chép các phần tử của một đối tượng hoặc mảng.
                taskName,
                assigneeId: currentProject.ownerId,
                idProjectManagement: currentProject.id,
                projectId: currentProject.id,
                assignDate,
                dueDate,
                priority,
                progress,
                status,
                personInCharge: personInCharge + "@gmail.com"
            };
        }
    } else {
        let taskId = parseInt(localStorage.getItem("taskId") || "0") + 1;
        localStorage.setItem("taskId", taskId);

        tasksMission.push({
            id: taskId,
            idProjectManagement: currentProject.id,
            taskName,
            assigneeId: currentProject.ownerId,
            projectId: currentProject.id,
            assignDate,
            dueDate,
            priority,
            progress,
            status,
            personInCharge: personInCharge + "@gmail.com"
        });
    }

    localStorage.setItem("tasks", JSON.stringify(tasksMission));

    // Reset form
    modalErase.removeAttribute("data-task-id");
    modalErase.style.display = "none";

    document.getElementById("updateTask").value = "";
    document.getElementById("inputPersonInCharge").value = "";
    document.getElementById("inputStatus").value = "";
    document.getElementById("inputAssignDate").value = "";
    document.getElementById("inputDueDate").value = "";
    document.getElementById("inputPriority").value = "";
    document.getElementById("inputProgress").value = "";

    const filteredTasks = tasksMission.filter(task => task.idProjectManagement === currentProject.id);
    updateTable(filteredTasks);
});





//đóng/mở các dòng nhiệm vụ trong bảng và thay đổi hiển thị icon cho các trạng thái nhiệm vụ.
function toggleSection(section) {
    const statusMap = {
        todo: "To do",
        inProgress: "In Progress",
        pending: "Pending",
        done: "Done"
    };

    const statusText = statusMap[section];
    const rows = document.querySelectorAll(`tr.task-row[data-status="${statusText}"]`);

    if (rows.length === 0) return; // Không có nhiệm vụ thì thoát

    const isHidden = rows[0].style.display === "none" || rows[0].style.display === "";
    //kiểm tra dòng đầu tiên có ẩn không, hoặc chưa thiết lập display thì mặc định là ẩn=>true
    // Đóng/mở các dòng nhiệm vụ
    rows.forEach(row => {
        row.style.display = isHidden ? "table-row" : "none";
    });

    // Hiển thị icon tương ứng
    const openIcon = document.querySelector(`.${section}-section`).previousElementSibling.querySelector(".open");
    const closeIcon = document.querySelector(`.${section}-section`).previousElementSibling.querySelector(".close");

    openIcon.style.visibility = isHidden ? "visible" : "hidden";
    closeIcon.style.visibility = isHidden ? "hidden" : "visible";
}


//HÀM CẬP NHẬT BẢNG
// Hàm cập nhật bảng với các nhiệm vụ còn lại
function updateTable(tasksMission) {
    const sections = {
        "To do": document.querySelector(".todo-section"),
        "In Progress": document.querySelector(".inProgress-section"),
        "Pending": document.querySelector(".pending-section"),
        "Done": document.querySelector(".done-section")
    };

    // Xóa tất cả các nhiệm vụ trước đó
    document.querySelectorAll(".task-row").forEach(row => row.remove());

    tasksMission.forEach(task => {
        const taskRow = `
    <tr class="task-row" data-task-id="${task.id}" data-status="${task.status}">
        <td style=" text-align: left; padding-left: 20px;">${task.taskName}</td>
        <td>${task.personInCharge.replace("@gmail.com", "")}</td>
        <td><span class="badge ${getPriorityBadgeClass(task.priority)}">${task.priority}</span></td>
        <td class="date-cell" style="color: #0D6EFD;">${formatDate(task.assignDate)}</td>
        <td class="date-cell" style="color: #0D6EFD;">${formatDate(task.dueDate)}</td>
        <td><span class="badge ${getProgressBadgeClass(task.progress)}">${task.progress}</span></td>
        <td>
            <button class="editMission">Sửa</button>
            <button class="deleteMission">Xóa</button>
        </td>
    </tr>`;

        const section = sections[task.status];
        section.insertAdjacentHTML("afterend", taskRow); // insertAdjacentHTML("afterend"):chèn ngay sau dòng tiêu đề section
    });
}
function formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}-${parts[1]}`; // Trả về dạng dd/mm
}

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







// TÌM KIẾM NHIỆM VỤ : theo tên 
document.getElementById("searchTask").addEventListener("input", function (event) {
    event.preventDefault();
    const searchTerm = event.target.value.toLowerCase(); // Lấy từ khoá tìm kiếm

    const tasks = document.querySelectorAll(".task-row"); // Tất cả các dòng nhiệm vụ

    tasks.forEach(task => {
        const taskName = task.children[0].innerText.toLowerCase(); // Tên nhiệm vụ
       
        // Nếu taskName hoặc personInCharge có chứa từ khoá tìm kiếm thì hiển thị, ngược lại ẩn
        if (taskName.includes(searchTerm) ) {
            task.style.display = "table-row";
        } else {
            task.style.display = "none";
        }
    });
});









// XẮP XẾP NHIỆM VỤ THEO HẠN CHÓT
// Lắng nghe sự thay đổi trong chọn sắp xếp
document.getElementById("arrangeTasks").addEventListener("change", function (event) {
    const selectedOption = event.target.value;
    if (selectedOption === "Hạn chót") {
        sortTasksByDueDate();
    } else if (selectedOption === "Độ ưu tiên") {
        sortTasksByPriority();
    }
});


//XẮP XẾP THEO ĐỘ ƯU TIÊN 
function sortTasksByPriority() {
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    let tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];
    let filteredTasks = tasksMission.filter(task => task.idProjectManagement === projectManagement.id);
    const priorityOrder = {
        "Thấp": 1,
        "Trung bình": 2,
        "Cao": 3
    };
    filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    updateTable(filteredTasks);
}





// xẮP XẾP THEO NGÀY THÁNG HẠN CHÓT
function sortTasksByDueDate() {
    // Lấy dữ liệu của dự án hiện tại từ localStorage
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));

    // Lấy danh sách tất cả nhiệm vụ từ localStorage
    let tasksMission = JSON.parse(localStorage.getItem("tasks")) || [];

    // Lọc chỉ lấy nhiệm vụ thuộc về dự án hiện tại (idProjectManagement === projectManagement.id)
    let filteredTasks = tasksMission.filter(task => task.idProjectManagement === projectManagement.id);

    // Sắp xếp các nhiệm vụ theo ngày tháng hạn chót (từ lớn đến bé)
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Cập nhật lại bảng hiển thị sau khi sắp xếp
    updateTable(filteredTasks);
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




// XẮP XẾP NHIỆM VỤ THEO HẠN CHÓT





// HIỂN THỊ CÁC NHIỆM VỤ RIÊNG BIỆT CỦA TỪNG PROJECT
window.addEventListener("DOMContentLoaded", function () {
    const project = JSON.parse(localStorage.getItem("projectManagement"));
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Lọc ra các task có idProjectManagement trùng với project.id
    const filteredTasks = allTasks.filter(task => task.idProjectManagement === project.id);

    // Cập nhật bảng hoặc hiển thị danh sách nhiệm vụ
    updateTable(filteredTasks);

    // Hiển thị thành viên của dự án
    showTableMember();
});

// const personInCharge = task.children[1].innerText.toLowerCase(); // Người phụ trách
// //duyệt qua mảng task lấy phần tử đầu tiên là nhiệm vụ phần tử thứ 2 là người phụ trách 
// || personInCharge.includes(searchTerm)


