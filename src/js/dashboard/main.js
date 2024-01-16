const salir = document.getElementById('salir');

if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}    

salir.addEventListener("click", () => {
    localStorage.removeItem("id");
    window.location.reload();
})
