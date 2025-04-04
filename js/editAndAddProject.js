const projects=[    
    {
        id:1,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:2,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:3,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:4,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:5,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:6,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:7,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:8,
        name: 'Xây dựng website thương mại điện tử',
    },
    {
        id:9,
        name: 'Xây dựng website thương mại điện tử',
    },
]
let addProject = document.getElementById("addProject")
function showProject(){
    addProject.innerHTML="";
    projects.forEach((cart,index)=>{    
        let addCart = `
        <tr>
                                <td class="projectID">${cart.id}</td>
                                <td>${cart.name}</td>
                                <td class="act">
                                    <button id="clickFix">Sửa</button>
                                    <button id="clickErase">Xóa</button>
                                    <button>Chi tiết</button>
                                </td>
                            </tr>
        `
        addProject.innerHTML+=addCart;
    })
}
// function deleteProject(index){
//     projects.splice(index,1);
//     localStorage.setItem("projects", JSON.stringify(projects));
//     showProject();
// }
// document.getElementById("save").onclick = function(){
//     const upDateProjectName = document.getElementById("upDateProjectName").value
//     if
// }

document.getElementById("clickFix").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
    modalAddNewEdit.style.display = "flex"; // Hiển thị modal
});


document.getElementById("clickAddProject").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
    modalAddNewEdit.style.display = "flex"; // Hiển thị modal
});


document.getElementById("cancel").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
    modalAddNewEdit.style.display = "none"; // Hiển thị modal
});

document.getElementById("save").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
    modalAddNewEdit.style.display = "none"; // Hiển thị modal
});

document.getElementById("outEditProjet").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của nút
    
    let modalAddNewEdit = document.querySelector(".modalAddNewEdit"); // Lấy modal với class 'modalAddNewEdit'
    modalAddNewEdit.style.display = "none"; // Hiển thị modal
});

