const d = document,
    tituloName = d.getElementById('titulo-name'),
    salir = d.getElementById('salir');

if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}  

document.addEventListener("DOMContentLoad",(event) => {
    event.preventDefault();
})

const notificarBtn = document.querySelector('#notificar')

notificarBtn.addEventListener('click',()=>{
    Notification.requestPermission().then(resultado =>{
        console.log('Respuesta: ', resultado);
    })

})

const VerNotificacion = document.querySelector('#ver')

VerNotificacion.addEventListener('click', () =>{
    if(Notification.permission === 'granted'){
        const notificacion = new Notification('Esta es la notificacion de SubSphere.',{
            icon: "../../img/dashboard/SubS.png",
            body:"Pagina de SubSphere"
        });
        notificacion.onclick = function(){
            window.open('http://127.0.0.1:5501/src/index.html')
        }
    }
})


salir.addEventListener("click", () => {
    window.location = "index.html";
    localStorage.removeItem("id");
    localStorage.removeItem("status");
    localStorage.removeItem("mode");
    window.location.reload();
})