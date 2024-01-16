const d = document,
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
                plan: "free"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
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
                plan: "plus"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
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
                plan: "premiun"
            })
        },
        res = await fetch(`http://localhost:3000/usuarios/${localStorage.getItem("id")}`, options),
        json = await res.json();

        localStorage.removeItem("nombre");
        localStorage.removeItem("correo");
        localStorage.removeItem("contrasena");
        window.location = "../../components/dashboard/main.html";
        
    } catch (error) {
        console.log(error);
    }
}

free.addEventListener("click", planFree);
plus.addEventListener("click", planPlus);
premiun.addEventListener("click", planPremiun);
