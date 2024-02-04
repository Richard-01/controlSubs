const d = document,
    tituloName = d.getElementById('titulo-name'),
    salir = d.getElementById('salir');

if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}  

document.addEventListener("DOMContentLoad",(event) => {
    event.preventDefault();
})

let user = {}

const URL = "http://localhost:3000/usuarios/";
const URLSUBS = "http://localhost:3000/plataformas";

const getAll = async () => {
    try {
        let res = await fetch(URL),
        json = await res.json();

        for (let i = 0; i < json.length; i++) {
            if ( json[i].id == localStorage.getItem("id") ) {
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

        tituloName.textContent = `Hola, ${user.nombre}!`;

    } catch (error) {
        console.log(error);
    }
}

getAll();

const getSuscriptions = async () => {
    const contData = document.getElementById("contData");
    let subsActivas = 0;
    let gastoMensual = 0;
    try {
        let res = await fetch(URLSUBS),
        json = await res.json();
        if (user.subs == 0) {
            const elem = document.createRange().createContextualFragment(`
            <h2 class="titulo-fin">Aun no tienes suscripciones, que esperas!</h2>
            <a class="btn-agg" href="suscripcion.html">Agregar suscripcion</a>
            `)
            contData.append(elem)
        }
        user.subs.forEach(e => {
            let diasPlan
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
                    if ( e.frecuencia == "Mensual" ) { diasPlan = 30};
                    if ( e.frecuencia == "Anual" ) { diasPlan = 365};
                    if ( e.frecuencia == "Semanal" ) { diasPlan = 7};
                    let fechaPorcentaje = fechaNum / diasPlan;
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
                        <p>Has usado tu plan un ${(fechaPorcentaje*100).toFixed(0)}% desde que lo adquiriste</p>
                        <div class="cont-barra"> 
                            <div class="barra">
                                <div class="bar" style="width: ${(fechaPorcentaje*100).toFixed(0)}%;"></div>
                            </div> 
                        </div>
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
