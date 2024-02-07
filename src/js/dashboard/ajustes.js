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



/////




// const accountSid = "USa4393d104651d2dddc3001cf4663ad0e";
// const authToken = "AC653292a0d19e8df093555ae76010d266";
// const client = require('twilio')(accountSid, authToken);

// client.messages
//       .create({from: '+15557122661', body: 'no olvides pagar tu suscripcion', to: '+573218741020'})
//       .then(message => console.log(message.sid));



salir.addEventListener("click", () => {
    window.location = "index.html";
    localStorage.removeItem("id");
    localStorage.removeItem("status");
    localStorage.removeItem("mode");
    window.location.reload();
})