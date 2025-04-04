function toggleSection(section) {
    const sectionElement = document.querySelector(`.${section}-section`);
    if (sectionElement.style.display === "none" || sectionElement.style.display === "") {
        sectionElement.style.display = "table-row";
    } else {
        sectionElement.style.display = "none";
    }
}


// THÊM THÀNH VIÊN
document.getElementById("addMember").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "flex"; 
});
document.getElementById("add3Cancel").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none"; 
});
document.getElementById("add3Save").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none"; 
});
document.getElementById("outAdd1").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".addMember");
    modalErase.style.display = "none"; 
});



// THÀNH VIÊN
document.getElementById("showMember").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "flex"; 
});
document.getElementById("outShowMember").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none"; 
});
document.getElementById("closeShow4").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none"; 
});
document.getElementById("saveShow4").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".showMember");
    modalErase.style.display = "none"; 
});






// THÊM SỬA NHIỆM VỤ
document.getElementById("addMission").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "flex"; 
});
document.querySelectorAll(".editMission").forEach(function(editButton) {
    editButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        let modalErase = document.querySelector(".add-editTask");
        modalErase.style.display = "flex"; 
    });
});
document.getElementById("outAddEdit").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none"; 
});
document.getElementById("task3Cancel").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none"; 
});
document.getElementById("task3Save").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".add-editTask");
    modalErase.style.display = "none"; 
});



