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
// Lấy dữ liệu dự án từ localStorage
let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// THÊM THÀNH VIÊN
document.getElementById("add3Save").addEventListener("click", function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của sự kiện (ngừng việc gửi form)

    // Lấy giá trị từ các trường trong form
    let newEmail = document.getElementById("emailMember").value.trim(); // Lấy giá trị email từ trường input có id "emailMember"
    let newRole = document.getElementById("role").value; // Lấy giá trị vai trò từ trường input có id "role"
    let emailMemberFail = document.getElementById("emailMemberFail");

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
    avatarMember()
    // Reset form: ẩn modal và làm sạch giá trị trong form
    document.querySelector(".addMember").style.display = "none"; // Đóng modal
    document.getElementById("emailMember").value = ""; // Reset giá trị email
    document.getElementById("role").value = ""; // Reset giá trị role

    // Kiểm tra xem dữ liệu đã được lưu vào localStorage chưa
    console.log("Dữ liệu đã được lưu:", localStorage.getItem("projectManagement"));
});
avatarMember()



//HIỂN THỊ THÀNH VIÊN
let addAvartarMember = document.querySelector(".member2");
function avatarMember() {
    addAvartarMember.innerHTML = "";
    let avartar = currentUser.fullName(1, 3);
    projectManagement.members.forEach((member) => {
        let addCartMember = `
        <div class="user">
            <div class="user1">
                <p>${avartar}</p>
            </div>
            <div class="position">
                <p>${currentUser.fullName}</p>
                <p>${member.role}</p>
            </div>
        </div>
`
        addAvartarMember.innerHTML += addCartMember;
    })

}




// LỒNG PHẦN TIÊU ĐỀ
let addTitle = document.querySelector(".left2");
function showTitle() {
    // Kiểm tra nếu dự án tồn tại
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









//LƯU THÊM SỬA NHIỆM VỤ
document.getElementById("task3Save").addEventListener("click", function (event) {
    event.preventDefault();

})































function toggleSection(section) {
    const sectionElement = document.querySelector(`.${section}-section`);
    if (sectionElement.style.display === "none" || sectionElement.style.display === "") {
        sectionElement.style.display = "table-row";
    } else {
        sectionElement.style.display = "none";
    }
}

// THÊM THÀNH VIÊN
document.getElementById("addMember").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "flex";
});
document.getElementById("add3Cancel").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none";
});

document.getElementById("outAdd1").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none";
});



// THÀNH VIÊN
document.getElementById("showMember").addEventListener("click", function (event) {
    event.preventDefault();

    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "flex";
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
document.getElementById("task3Save").addEventListener("click", function (event) {
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
