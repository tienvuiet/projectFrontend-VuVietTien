document.getElementById("clickErase").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".modalErase"); // Lấy modal với class 'modalErase'
    modalErase.style.display = "flex"; 
});
// ẩn trang xóa
document.getElementById("cancelOfErase").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".modalErase"); // Lấy modal với class 'modalErase'
    modalErase.style.display = "none"; 
});
// xóa 
document.getElementById("saveOfErase").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".modalErase"); // Lấy modal với class 'modalErase'
    modalErase.style.display = "none"; 
});
// thoát trang xóa
document.getElementById("outDeleteProjet").addEventListener("click", function(event) {
    event.preventDefault(); 
    
    let modalErase = document.querySelector(".modalErase"); // Lấy modal với class 'modalErase'
    modalErase.style.display = "none"; 
});