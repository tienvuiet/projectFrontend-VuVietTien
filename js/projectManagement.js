const projects = [
  {
    id: 1,
    projectName: 'Xây dựng website thương mại điện tử',
    ownerId: 1,
    description: `Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh
                            toán
                            và
                            quản lý sản phẩm`,
    members: [
      // {
      //   userId: 1,
      //   email:  `annguyen@gmail.com`,
      //   role: "Project owner",
      // },
      // {
      //   userId: 2,
      //   email: `bachnguyen@gmail.com`,
      //   role: "Frontend developer",
      // },
    ]
  },
  {
    id: 2,
    projectName: 'Phát triển ứng dụng di động',
    ownerId: 1,
    description: `Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh
                            toán
                            và
                            quản lý sản phẩm`,
    members: [
      {
        userId: 1,
        email:  `annguyen@gmail.com`,
        role: "Project owner",
      },
      {
        userId: 2,
        email:  `annguyen@gmail.com`,
        role: "Frontend developer",
      },
    ]
  },
  {
    id: 3,
    projectName: 'Phát triển ứng dụng di động',
    ownerId: 2,
    description: `Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh
                            toán
                            và
                            quản lý sản phẩm`,
    members: [
      {
        userId: 1,
        email:  `annguyen@gmail.com`,
        role: "Project owner",
      },
      {
        userId: 2,
        email:  `annguyen@gmail.com`,
        role: "Frontend developer",
      },
    ]
  },
];

let addProject = document.getElementById("addProject");
let editingProjectId = null;
// editingPeojectId biến để nhận biết mình thêm hay sửa 
let currentPage = 1; // Trang hiện tại
const projectsPerPage = 7; // Số lượng dự án mỗi trang

// Hàm hiển thị các dự án theo trang
function showProject() {
  // Lấy lại dữ liệu projects từ localStorage
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let currentUserId = currentUser.id;

  addProject.innerHTML = ""; // Xóa bảng hiện tại

  // Lọc các dự án mà người dùng hiện tại là chủ sở hữu
  const userProjects = projects.filter(project => project.ownerId === currentUserId);

  // Tính toán chỉ mục bắt đầu và kết thúc cho mỗi trang
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  // Lấy các dự án trong phạm vi trang hiện tại
  const projectsToDisplay = userProjects.slice(startIndex, endIndex);

  // Hiển thị các dự án trong bảng
  projectsToDisplay.forEach((project) => {
    let addCart = `
      <tr>
        <td class="projectID">${project.id}</td>
        <td>${project.projectName}</td>
        <td class="act">
          <button class="clickFix">Sửa</button>
          <button class="clickErase">Xóa</button>
          <button class="detail">Chi tiết</button>
        </td>
      </tr>
    `;
    addProject.innerHTML += addCart;
  });

  // Cập nhật các nút phân trang
  updatePagination(userProjects.length);
}


// Cập nhật phân trang (hiển thị các nút điều hướng)
function updatePagination(totalProjects) {
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const pagination = document.querySelector('.transferList');

  pagination.innerHTML = ''; // Xóa phân trang hiện tại

  // Nút Trang trước
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&#60;";
  prevButton.id = "prevPage";
  prevButton.disabled = currentPage === 1; // Disable button if we are on the first page
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showProject();
    }
  });
  pagination.appendChild(prevButton);

  // Thêm các nút trang số
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i === currentPage) {
      pageButton.classList.add("active"); // Đánh dấu trang hiện tại
    }
    pageButton.addEventListener("click", function () {
      currentPage = i;
      showProject();
    });
    pagination.appendChild(pageButton);
  }

  // Nút Trang sau
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&#62;";
  nextButton.id = "nextPage";
  nextButton.disabled = currentPage === totalPages; // Disable button if we are on the last page
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showProject();
    }
  });
  pagination.appendChild(nextButton);
}


// Gọi hàm để hiển thị các dự án ban đầu
// showProject();




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

  // --- LẤY ID NGƯỜI DÙNG HIỆN TẠI ---
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "../pages/login.html"; // Nếu không có người dùng đăng nhập, chuyển hướng về trang login
    return;
  }

  let currentUserId = currentUser.id; // Lấy ID của người dùng hiện tại

  // --- KIỂM TRA TRÙNG TÊN DỰ ÁN CHỈ TRONG NHỮNG DỰ ÁN CỦA NGƯỜI DÙNG ---
  const isDuplicate = projects.some(project =>
    project.ownerId === currentUserId &&
    project.projectName.toLowerCase() === upDateProjectName.toLowerCase() &&
    project.id !== editingProjectId
  );

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
    // Thêm mới dự án và gán ownerId là người dùng hiện tại
    projects.push({
      id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
      projectName: upDateProjectName,
      description: projectDescription,
      ownerId: currentUserId,  // Gán ownerId cho dự án là ID người dùng hiện tại
      members: []
    });
  }

  // Lưu lại danh sách dự án trong localStorage
  localStorage.setItem("projects", JSON.stringify(projects));

  // Hiển thị lại các dự án
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



// TÌM KIẾM DỰ ÁN
document.getElementById("projectSearch").addEventListener("input", function () {
  let searchQuery = this.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
  let addProject = document.getElementById("addProject");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // if (!currentUser) {
  //   window.location.href = "../pages/login.html"; // Nếu không có người dùng đăng nhập, chuyển hướng về trang login
  //   return;
  // }

  let currentUserId = currentUser.id;

  addProject.innerHTML = ""; // Xóa nội dung cũ trong bảng

  // Lọc các dự án mà người dùng hiện tại là chủ sở hữu và tên dự án khớp với từ khóa tìm kiếm
  projects.forEach((project) => {
    if (project.ownerId === currentUserId && project.projectName.toLowerCase().includes(searchQuery)) {
      let addCart = `
        <tr>
          <td class="projectID">${project.id}</td>
          <td>${project.projectName}</td>
          <td class="act">
            <button class="clickFix">Sửa</button>
            <button class="clickErase">Xóa</button>
            <button class="detail">Chi tiết</button>
          </td>
        </tr>
      `;
      addProject.innerHTML += addCart;
    }
  });
});





// XÓA DỰ ÁN TRONG DANH SÁCH
addProject.addEventListener("click", function (event) {
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




// ĐIỀU HƯỚNG SANG TRANG CHI TIẾT DỰ ÁN
addProject.addEventListener("click", function (event) {
  if (event.target && event.target.classList.contains("detail")) {
    event.preventDefault();

    let row = event.target.closest('tr');
    let projectId = parseInt(row.querySelector('.projectID').innerText);

    // Tìm dự án cần xem chi tiết từ localStorage
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find(p => p.id === projectId);

    if (project) {
      console.log(project);
      
      // Lưu thông tin dự án vào localStorage với tên 'projectManagement'
      localStorage.setItem("projectManagement", JSON.stringify({
        id: project.id,
        projectName: project.projectName,
        description: project.description,
        ownerId: project.ownerId,
        members: projectManagement.members
      }));

      // Hiển thị thông báo xác nhận
      Swal.fire({
        title: "Successed!",
        text: "You have been redirected to the detail page.",
        icon: "success"
      }).then(() => {
        // Chuyển hướng đến trang chi tiết dự án
        window.location.href = "../pages/projectDetaile.html";
      });
    }
  }
});




// HIỂN THỊ NÚT THÊM DỰ ÁN
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
document.getElementById("cancel").addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của nút

  // Lấy modal chứa các ô input và textarea
  let modalAddNewEdit = document.querySelector(".modalAddNewEdit");

  // Đặt giá trị của các ô input và textarea về trạng thái ban đầu (trống)
  document.getElementById("upDateProjectName").value = "";
  document.getElementById("projectDescription").value = "";

  // Đóng modal
  modalAddNewEdit.style.display = "none";
});





// LẤY DỮ LIỆU TỪ TRANG QUẢN LÝ DỰ ÁN




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




// COMMENT GIẢI THÍCH
// .target Element mà người dùng bấm hoặc tác động vào