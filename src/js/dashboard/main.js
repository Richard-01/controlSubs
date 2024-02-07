//Traemos variables que utilizaremos del HTML
const d = document,
    tituloName = d.getElementById('titulo-name'),
    salir = d.getElementById('salir');

//Comprobamos si el usuario esta registrado y tiene ID, si no redireccionamos al comienzo
if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}  

//Prevent para prevenir errores
document.addEventListener("DOMContentLoad",(event) => {
    event.preventDefault();
})

//Variarble para luego llenarla con el usuario
let user = {}

//URL de ambas tablas 
const URL = "http://localhost:3000/usuarios/";
const URLSUBS = "http://localhost:3000/plataformas";

//Creamos la funcion que va a hacer todo
const getSuscriptions = async () => {
    try {
        //variables del fetch
        let res = await fetch(URL),
        json = await res.json();

        //Recorremos el array para traer datos del usuario
        for (let i = 0; i < json.length; i++) {
            if ( json[i].id == localStorage.getItem("id") ) {
                //Rellenamos el usuario segun el id del localStorage
                user = {
                    id: json[i].id,
                    nombre: json[i].nombre,
                    correo: json[i].correo,
                    contrasena: json[i].contrasena,
                    telefono: json[i].telefono,
                    plan: json[i].plan,
                    subs: json[i].subs
                }
            }
        }

        //Mostramos el titulo en el dashboard
        tituloName.textContent = `Hola, ${user.nombre}!`;

    } catch (error) {
        console.log(error);
    }
    //Creamos variables para darles uso luego
    const contData = document.getElementById("contData");
    let subsActivas = 0;
    let gastoMensual = 0;
    try {
        //variables del fetch
        let res = await fetch(URLSUBS),
        json = await res.json();
        //si el usuario no tiene suscripciones entoncens inyectamos HTML
        if (user.subs == 0) {
            const elem = document.createRange().createContextualFragment(`
            <h2 class="titulo-fin">Aun no tienes suscripciones, que esperas!</h2>
            <a class="btn-agg" href="suscripcion.html">Agregar suscripcion</a>
            `)
            contData.append(elem)
        }
        user.subs.forEach(e => {
            //console.log(e);
            for (let i = 0; i < json.length; i++) {
                //console.log(json[i]);
                if ( json[i].nombre === e.plataforma ) {
                    subsActivas += 1;
                    const contSubs = document.getElementById("contSubs");
                    contSubs.textContent = subsActivas;
                    gastoMensual += e.precio;
                    const contDinero = document.getElementById("contDinero");
                    contDinero.textContent = `$ ${gastoMensual}`;
                    let fechaConv = e.fecha.split('')
                    let fechaNum1 = parseInt(fechaConv[8])
                    let fechaNum2 = parseInt(fechaConv[9])
                    let fechaNum = fechaNum1 + fechaNum2;
                    
                    if ( e.frecuencia == "Anual" ) { 
                        fechaNum = "un año"
                    };
                    if ( e.frecuencia == "Semanal" ) { 
                        fechaNum += 7
                    };
                    console.log(fechaNum);
                    console.log();
                    const elemento = document.createRange().createContextualFragment(`
                    <details name="info">
                        <summary>
                            <div class="cont-img">
                                <img src="${json[i].imagen}" alt="">
                            </div>
                            <div class="cont-txt">
                                <h3>${e. plataforma}</h3>
                                <h4>$ ${e.precio} / ${e.frecuencia}</h4>
                            </div>
                        </summary>
                        <p>Tu plan vence el ${fechaNum}</p>
                        
                    </details>
                    `);
                    contData.append(elemento);
                }
            }
            contData.style.maxHeight = "450px";
            contData.style.overflowY = "auto";
            contData.style.paddingTop = "200px";

        });
    } catch (err) {
        console.log(err);
    }
}

getSuscriptions();

salir.addEventListener("click", () => {
    window.location = "index.html";
    localStorage.removeItem("id");
    localStorage.removeItem("status");
    localStorage.removeItem("mode");
    window.location.reload();
})
