const projects = [
  // {
  //   id: 1,
  //   projectName: 'Xây dựng website thương mại điện tử',
  //   members: [
  //     {
  //       userId: 1,
  //       role: "Project owner",
  //     },
  //     {
  //       userId: 2,
  //       role: "Frontend developer",
  //     },
  //   ]
  // },
  // {
  //   id: 2,
  //   projectName: 'Phát triển ứng dụng di động',
  //   members: [
  //     {
  //       userId: 1,
  //       role: "Project owner",
  //     },
  //     {
  //       userId: 2,
  //       role: "Frontend developer",
  //     },
  //   ]
  // },
];

let addProject = document.getElementById("addProject");
let editingProjectId = null;
// editingPeojectId biến để nhận biết mình thêm hay sửa 



function showProject() {
  addProject.innerHTML = "";
  projects.forEach((cart, index) => {
    let addCart = `
        <tr>
            <td class="projectID">${cart.id}</td>
            <td>${cart.projectName}</td>
            <td class="act">
                <button class="clickFix">Sửa</button>
                <button class="clickErase">Xóa</button>
                <button>Chi tiết</button>
            </td>
        </tr>
    `;
    addProject.innerHTML += addCart;
  });
}


// LƯU DỰ ÁN
document.getElementById("save").addEventListener("click", function (event) {
  event.preventDefault();

  let upDateProjectNameInput = document.getElementById("upDateProjectName");
  let projectDescriptionInput = document.getElementById("projectDescription");
  let existUpDate = document.getElementById("existUpDate");
  let leaveBlankUpDate = document.getElementById("leaveBlankUpDate");
  let description2 = document.getElementById("description2");
  let nameLengthError = document.getElementById("nameLengthError");
  let descriptionLengthError = document.getElementById("descriptionLengthError");

  let upDateProjectName = upDateProjectNameInput.value.trim();
  let projectDescription = projectDescriptionInput.value.trim();

  // Ẩn tất cả thông báo lỗi trước
  leaveBlankUpDate.style.visibility = "hidden";
  existUpDate.style.visibility = "hidden";
  description2.style.visibility = "hidden";
  nameLengthError.style.visibility = "hidden";
  descriptionLengthError.style.visibility = "hidden";

  // --- KIỂM TRA TÊN DỰ ÁN ---
  if (upDateProjectName === "") {
    leaveBlankUpDate.style.visibility = "visible";
    upDateProjectNameInput.style.border = "1px solid red";
    return;
  } else if (upDateProjectName.length < 8 || upDateProjectName.length > 150) {
    nameLengthError.style.visibility = "visible";
    upDateProjectNameInput.style.border = "1px solid red";
    return;
  } else {
    upDateProjectNameInput.style.border = "";
  }

  // --- KIỂM TRA TRÙNG TÊN ---
  const isDuplicate = projects.some(project => project.projectName.toLowerCase() === upDateProjectName.toLowerCase() && project.id !== editingProjectId);

  if (isDuplicate) {
    existUpDate.style.visibility = "visible";
    return;
  }

  // --- KIỂM TRA MÔ TẢ ---
  if (projectDescription === "") {
    description2.style.visibility = "visible";
    projectDescriptionInput.style.border = "1px solid red";
    return;
  } else if (projectDescription.length < 8 || projectDescription.length > 250) {
    descriptionLengthError.style.visibility = "visible";
    projectDescriptionInput.style.border = "1px solid red";
    return;
  } else {
    projectDescriptionInput.style.border = "";
  }

  // --- THÊM MỚI HOẶC CẬP NHẬT ---
  if (editingProjectId !== null) {
    const project = projects.find(p => p.id === editingProjectId);
    if (project) {
      project.projectName = upDateProjectName;
      project.description = projectDescription;
    }
  } else {
    projects.push({
      id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
      projectName: upDateProjectName,
      description: projectDescription,
      members: []
    });
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  showProject();

  // Reset form
  document.querySelector(".modalAddNewEdit").style.display = "none";
  upDateProjectNameInput.value = "";
  projectDescriptionInput.value = "";
  editingProjectId = null;
});

showProject();





//HIỂN THỊ CHỈNH SỬA DỰ ÁN
addProject.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("clickFix")) {
    event.preventDefault();

    let row = event.target.closest('tr');
    let projectId = parseInt(row.querySelector('.projectID').innerText);

    // Tìm dự án cần sửa
    const project = projects.find(p => p.id === projectId);
    if (project) {
      // Gán dữ liệu lên input
      document.getElementById("upDateProjectName").value = project.projectName;
      document.getElementById("projectDescription").value = project.description || "";

      // Ghi nhớ ID đang sửa
      editingProjectId = projectId;

      // Hiển thị modal
      let modalAddNewEdit = document.querySelector(".modalAddNewEdit");
      modalAddNewEdit.style.display = "flex";
    }
  }
});






// XÓA DỰ ÁN TRONG DANH SÁCH
addProject.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("clickFix")) {
    event.preventDefault();
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit");
    modalAddNewEdit.style.display = "flex";
  }

  if (event.target && event.target.classList.contains("clickErase")) {
    event.preventDefault();

    let row = event.target.closest('tr');
    let projectId = parseInt(row.querySelector('.projectID').innerText);
// thư viện sweetalert2 không phải cop chat đâu
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirmed deletion
        const index = projects.findIndex(project => project.id === projectId);
        if (index !== -1) {
          projects.splice(index, 1); // Remove the project from the array
          localStorage.setItem("projects", JSON.stringify(projects));
          showProject(); // Re-render the project table

          Swal.fire({
            title: "Deleted!",
            text: "The project has been successfully deleted.",
            icon: "success"
          });
        }
      }
    });
  }
});







document.getElementById("clickAddProject").addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của nút

  let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
  modalAddNewEdit.style.display = "flex"; // Hiển thị modal

});


// THOÁT RA KHỎI BẢNG MODALADDNEWEDIT
document.getElementById("outEditProjet").addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của nút

  let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
  modalAddNewEdit.style.display = "none"; 
});






// THÔNG BÁO ĐĂNG XUẤT
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




// COMMENT GIẢI THÍCH
// .target Element mà người dùng bấm hoặc tác động vào