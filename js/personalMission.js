// CHUYỂN SANG TRANG DỰ ÁN     
document.getElementById("projectManagementPage").addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../pages/projectManagement.html";
})




//HIỂN THỊ BẢNG CẬP NHẬT TRẠNG THÁI
const openUpdateElements = document.querySelectorAll(".openUpdate");
openUpdateElements.forEach(function(element) {
  element.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector(".updateStatus").style.display = "flex";
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
  document.querySelector(".updateStatus").style.display = "none";
});





// ĐÓNG MỞ NHIỆM VỤ
document.querySelector(".mission1").addEventListener("click", function(event) {  
  event.preventDefault();
  // Lấy tất cả các phần tử có class "display"
  let show1 = document.querySelectorAll(".display");

  // Kiểm tra trạng thái của các phần tử có class "display"
  show1.forEach(function(row) {
    // Nếu phần tử đang ẩn, hiển thị nó, ngược lại thì ẩn đi
    if (row.style.display === "none") {
      row.style.display = "table-row";  
    } else {
      row.style.display = "none";  
    }
  });
});


document.querySelector(".mission2").addEventListener("click", function(event) {  
  event.preventDefault();
  // Lấy tất cả các phần tử có class "display"
  let show1 = document.querySelectorAll(".display2");

  // Kiểm tra trạng thái của các phần tử có class "display"
  show1.forEach(function(row) {
    // Nếu phần tử đang ẩn, hiển thị nó, ngược lại thì ẩn đi
    if (row.style.display === "none") {
      row.style.display = "table-row";  // Hiển thị lại phần tử
    } else {
      row.style.display = "none";  // Ẩn phần tử
    }
  });
});


//HÀM ĐĂNG XUẤT
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
          // Xóa thông tin đăng nhập trước đóđó
          localStorage.removeItem("currentUser");
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
  


