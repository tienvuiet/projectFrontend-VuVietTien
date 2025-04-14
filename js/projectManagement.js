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

    ]
  },
  {
    id: 3,
    projectName: 'Quản lý dự liễu khách hàng',
    ownerId: 1,
    description: `Dự án nhằm phát triển một nền tảng thương mại điện tử với các tính năng như giỏ hàng, thanh
                            toán
                            và
                            quản lý sản phẩm`,
    members: [

    ]
  },
];





//  Kiểm tra và khôi phục dữ liệu 
let projectManagement = JSON.parse(localStorage.getItem("projectManagement"));

// Kiểm tra nếu projectManagement không tồn tại hoặc không có thuộc tính 'members'
if (!projectManagement) {
  // Khôi phục đối tượng projectManagement với dữ liệu mặc định nếu không tồn tại
  projectManagement = {
    id: null,
    projectName: '',
    description: '',
    ownerId: null,
    members: [],
  };
  localStorage.setItem("projectManagement", JSON.stringify(projectManagement));
} else {
  // Nếu projectManagement đã tồn tại, kiểm tra nếu thuộc tính members có sẵn
  if (!projectManagement.members) {
    // Khởi tạo lại 'members' nếu không có
    projectManagement.members = [];
    // Lưu lại dữ liệu cập nhật vào localStorage
    localStorage.setItem("projectManagement", JSON.stringify(projectManagement));
  }
}









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
  prevButton.disabled = currentPage === 1; // Nút vô hiệu hóa nếu chúng ta đang ở trang đầu tiên
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
  nextButton.disabled = currentPage === totalPages; //Nút vô hiệu hóa nếu chúng ta đang ở trang cuối cùng
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showProject();
    }
  });
  pagination.appendChild(nextButton);
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

  // Kiểm tra tên dự án
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

  // Lấy ID người dùng hiện tại
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "../pages/login.html";
    return;
  }

  let currentUserId = currentUser.id;

  // Kiểm tra trùng tên dự án
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const isDuplicate = projects.some(
    (project) =>
      project.ownerId === currentUserId &&
      project.projectName.toLowerCase() === upDateProjectName.toLowerCase() &&
      project.id !== editingProjectId
  );

  if (isDuplicate) {
    existUpDate.style.visibility = "visible";
    return;
  }

  // Kiểm tra mô tả
  if (projectDescription === "") {
    description2.style.visibility = "visible";
    projectDescriptionInput.style.border = "1px solid red";
    return;
  } else if (projectDescription.length < 5 || projectDescription.length > 250) {
    descriptionLengthError.style.visibility = "visible";
    projectDescriptionInput.style.border = "1px solid red";
    return;
  } else {
    projectDescriptionInput.style.border = "";
  }

  // Thêm mới hoặc cập nhật
  if (editingProjectId !== null) {
    const project = projects.find((p) => p.id === editingProjectId);
    if (project) {
      project.projectName = upDateProjectName;
      project.description = projectDescription;
    }
  } else {
    projects.push({
      id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1,
      projectName: upDateProjectName,
      description: projectDescription,
      ownerId: currentUserId,
      members: [],
    });
  }

  // Lưu vào localStorage
  localStorage.setItem("projects", JSON.stringify(projects));

  // Hiển thị lại danh sách dự án
  showProject();

  // Đóng modal và reset form
  document.querySelector(".modalAddNewEdit").style.display = "none";
  resetForm(); // Reset form
});

showProject();





function resetForm() {
  document.getElementById("upDateProjectName").value = "";
  document.getElementById("projectDescription").value = "";
  document.querySelector(".modalAddNewOfTitle p").textContent = "Thêm dự án"; // Cập nhật tiêu đề
  editingProjectId = null;

  // Ẩn các thông báo lỗi
  document.getElementById("leaveBlankUpDate").style.visibility = "hidden";
  document.getElementById("existUpDate").style.visibility = "hidden";
  document.getElementById("description2").style.visibility = "hidden";
  document.getElementById("nameLengthError").style.visibility = "hidden";
  document.getElementById("descriptionLengthError").style.visibility = "hidden";

  // Xóa viền đỏ nếu có
  document.getElementById("upDateProjectName").style.border = "";
  document.getElementById("projectDescription").style.border = "";
}





//HIỂN THỊ CHỈNH SỬA DỰ ÁN
// addProject.addEventListener("click", function (event) {
//   if (event.target && event.target.classList.contains("clickFix")) {
//     event.preventDefault();

//     let row = event.target.closest('tr');
//     // Tìm dòng cha của nút sửa (tr) và lấy ID dự án từ ô có class "projectID"
//     let projectId = parseInt(row.querySelector('.projectID').innerText);
//     //tìm được cột có class="projectID", innerText lấy nội dung của nó là parseInt chuyển từ chuỗi sang số nguyênn
//     // Tìm dự án cần sửa
//     const project = projects.find(p => p.id === projectId);
//     if (project) {
//       // Gán dữ liệu lên input
//       document.getElementById("upDateProjectName").value = project.projectName;
//       document.getElementById("projectDescription").value = project.description || "";

//       // Ghi nhớ ID đang sửa
//       editingProjectId = projectId;

//       // Hiển thị modal
//       let modalAddNewEdit = document.querySelector(".modalAddNewEdit");
//       modalAddNewEdit.style.display = "flex";
//     }
//   }
// });



// TÌM KIẾM DỰ ÁN
document.getElementById("projectSearch").addEventListener("input", function () {
  let searchQuery = this.value.trim().toLowerCase();
  let addProject = document.getElementById("addProject");
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let currentUserId = currentUser.id;

  // Lấy dữ liệu từ localStorage
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Nếu ô tìm kiếm rỗng, gọi showProject() để hiển thị đầy đủ
  if (searchQuery === "") {
    showProject();
    return;
  }

  // Xóa nội dung bảng
  addProject.innerHTML = "";

  // Lọc và hiển thị dự án khớp với từ khóa
  const filteredProjects = projects.filter(
    (project) =>
      project.ownerId === currentUserId &&
      project.projectName.toLowerCase().includes(searchQuery)
  );

  filteredProjects.forEach((project) => {
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

  // Ẩn phân trang khi tìm kiếm (tùy chọn)
  document.querySelector(".transferList").style.display = filteredProjects.length > 0 ? "none" : "flex";
});




addProject.addEventListener("click", function (event) {
  const target = event.target;

  // Nút Sửa
  if (target.classList.contains("clickFix")) {
    event.preventDefault();
    const row = target.closest("tr");
    const projectId = parseInt(row.querySelector(".projectID").textContent);
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find((p) => p.id === projectId);

    if (project) {
      document.getElementById("upDateProjectName").value = project.projectName;
      document.getElementById("projectDescription").value = project.description || "";
      document.querySelector(".modalAddNewOfTitle p").textContent = "Sửa dự án"; // Cập nhật tiêu đề
      editingProjectId = projectId;
      document.querySelector(".modalAddNewEdit").style.display = "flex";
    }
  }

  // Nút Xóa
  else if (target.classList.contains("clickErase")) {
    event.preventDefault();
    const row = target.closest("tr");
    const projectId = parseInt(row.querySelector(".projectID").textContent);
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be undone.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        const index = projects.findIndex((project) => project.id === projectId);
        if (index !== -1) {
          projects.splice(index, 1);
          localStorage.setItem("projects", JSON.stringify(projects));
          showProject();
          Swal.fire({
            title: "Deleted!",
            text: "Project deleted successfully.",
            icon: "success",
          });
        }
      }
    });
  }

  // Nút Chi tiết
  else if (target.classList.contains("detail")) {
    event.preventDefault();
    const row = target.closest("tr");
    const projectId = parseInt(row.querySelector(".projectID").textContent);
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    let projectManagement = JSON.parse(localStorage.getItem("projectManagement")) || {};
    const project = projects.find((p) => p.id === projectId);

    if (project) {
      // Đồng bộ members của projectManagement hiện tại vào projects
      if (projectManagement.id && projectManagement.members) {
        const currentProjectIndex = projects.findIndex((p) => p.id === projectManagement.id);
        if (currentProjectIndex !== -1) {
          projects[currentProjectIndex].members = [...projectManagement.members];
        }
      }

      // Lưu projectManagement mới cho dự án được chọn
      localStorage.setItem(
        "projectManagement",
        JSON.stringify({
          id: project.id,
          projectName: project.projectName,
          description: project.description,
          ownerId: project.ownerId,
          members: project.members || [], // Lấy members từ projects
        })
      );

      // Cập nhật projects vào localStorage
      localStorage.setItem("projects", JSON.stringify(projects));

      Swal.fire({
        title: "Success!",
        text: "You have been redirected to the detail page.",
        icon: "success",
      }).then(() => {
        window.location.href = "../pages/projectDetaile.html";
      });
    }
  }
});

// Gọi hàm hiển thị dự án khi trang tải
showProject();



// CHUYỂN HƯỚNG SANG TRANG NHIỆM VỤ CỦA TÔI 
document.getElementById("personalTaskPage").addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "../pages/personalMission.html";
})





// HIỂN THỊ NÚT THÊM DỰ ÁN
document.getElementById("clickAddProject").addEventListener("click", function (event) {
  event.preventDefault();
  resetForm(); 
  let modalAddNewEdit = document.querySelector(".modalAddNewEdit");
  modalAddNewEdit.style.display = "flex";
});


// thoát khỏi bảng 
document.getElementById("outEditProjet").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".modalAddNewEdit").style.display = "none";
  resetForm(); 
});
//hủy thêm dự án
document.getElementById("cancel").addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector(".modalAddNewEdit").style.display = "none";
  resetForm(); 
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







// MÀU THẺ A
// Lấy URL hiện tại
// let currentPage = window.location.pathname;

// // Lấy các thẻ <a> và kiểm tra URL để xác định trang hiện tại
// let links = document.querySelectorAll('a');

// links.forEach(link => {
//     // So sánh đường dẫn của mỗi thẻ <a> với URL của trang hiện tại
//     if (currentPage.includes(link.getAttribute('href'))) {
//         // Thêm class 'active' để thay đổi màu thẻ <a> khi ở trang đó
//         link.classList.add('active');
//     }
// });



// COMMENT GIẢI THÍCH
// .target Element mà người dùng bấm hoặc tác động vào