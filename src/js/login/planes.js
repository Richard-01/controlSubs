const d = document,
    cardUno = d.getElementById('cardUno'),
    cardDos = d.getElementById('cardDos'),
    cardTres = d.getElementById('cardTres'),
    free = d.getElementById('free'),
    plus = d.getElementById('plus'),
    premiun = d.getElementById('premiun');


if ( !localStorage.getItem("id") ) {
    window.location = "index.html";
}    

const planFree = async () => {
    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                nombre: localStorage.getItem("nombre"),
                correo: localStorage.getItem("correo"),
                contrasena: localStorage.getItem("contrasena"),
                telefono: parseInt(localStorage.getItem("telefono")),
                subs: 0,
                plan: "free"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
        localStorage.removeItem("telefono");
        window.location = "../../components/dashboard/main.html";

    } catch (error) {
        console.log(error);
    }
}

const planPlus = async () => {
    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                nombre: localStorage.getItem("nombre"),
                correo: localStorage.getItem("correo"),
                contrasena: localStorage.getItem("contrasena"),
                telefono: parseInt(localStorage.getItem("telefono")),
                subs: 0,
                plan: "plus"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
        localStorage.removeItem("telefono");
        window.location = "../../components/dashboard/main.html";
        
    } catch (error) {
        console.log(error);
    }
}

const planPremiun = async () => {
    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                nombre: localStorage.getItem("nombre"),
                correo: localStorage.getItem("correo"),
                contrasena: localStorage.getItem("contrasena"),
                telefono: parseInt(localStorage.getItem("telefono")),
                subs: 0,
                plan: "premiun"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
        localStorage.removeItem("telefono");
        window.location = "../../components/dashboard/main.html";
        
    } catch (error) {
        console.log(error);
    }
}

cardUno.addEventListener("click", planFree);
free.addEventListener("click", planFree);
cardDos.addEventListener("click", planPlus);
plus.addEventListener("click", planPlus);
cardTres.addEventListener("click", planPremiun);
premiun.addEventListener("click", planPremiun);
