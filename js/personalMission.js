const openUpdateElements = document.querySelectorAll(".openUpdate");
openUpdateElements.forEach(function(element) {
  element.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".updateStatus").style.display = "flex";
    // Lưu trữ phần tử <td> chứa trạng thái để sử dụng khi xác nhận
    element.closest("tr").querySelector("td:nth-child(3)").setAttribute("data-current-row", "true");
  });
});

document.getElementById("outEditProject").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector(".updateStatus").style.display = "none";
});

document.getElementById("cancel").addEventListener("click", function(event) {
  event.preventDefault();
  document.querySelector(".updateStatus").style.display = "none";
});




document.getElementById("confirm").addEventListener("click", function(event) {
  event.preventDefault();
  const statusCell = document.querySelector("td[data-current-row='true']");
  if (statusCell) {
    // Lấy trạng thái hiện tại bằng cách kiểm tra nội dung văn bản
    const currentStatus = statusCell.textContent.trim().startsWith("In Progress") ? "In Progress" : "Pending";
    // Chuyển đổi trạng thái
    const newStatus = currentStatus === "In Progress" ? "Pending" : "In Progress";
    // Cập nhật nội dung ô trạng thái
    statusCell.innerHTML = `${newStatus} <img src="../assets/Vector.png" alt="" class="openUpdate">`;
    // Xóa thuộc tính để tránh xung đột
    statusCell.removeAttribute("data-current-row");
    // Gắn lại sự kiện click cho hình ảnh openUpdate mới
    const newOpenUpdate = statusCell.querySelector(".openUpdate");
    newOpenUpdate.addEventListener("click", function(event) {
      event.preventDefault();
      document.querySelector(".updateStatus").style.display = "flex";
      statusCell.setAttribute("data-current-row", "true");
    });
  }
  document.querySelector(".updateStatus").style.display = "none";
});

// ĐÓNG MỞ NHIỆM VỤ
document.querySelector(".mission1").addEventListener("click", function(event) {  
  event.preventDefault();
  let show1 = document.querySelectorAll(".display");
  show1.forEach(function(row) {
    if (row.style.display === "none") {
      row.style.display = "table-row";  
    } else {
      row.style.display = "none";  
    }
  });
});

document.querySelector(".mission2").addEventListener("click", function(event) {  
  event.preventDefault();
  let show1 = document.querySelectorAll(".display2");
  show1.forEach(function(row) {
    if (row.style.display === "none") {
      row.style.display = "table-row";
    } else {
      row.style.display = "none";
    }
  });
});

// HÀM ĐĂNG XUẤT
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
        localStorage.removeItem("currentUser");
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

// Chuyển sang trang dự án
document.getElementById("projectManagementPage").addEventListener("click", function(event) {
  event.preventDefault();
  window.location.href = "../pages/projectManagement.html";
});