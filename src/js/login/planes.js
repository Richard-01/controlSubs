const d = document,
    free = d.getElementById('free'),
    plus = d.getElementById('plus'),
    premiun = d.getElementById('premiun');

if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}  

function pruevaCorreo() {

    let eBody = `
    <h1>Bienvenido a SubSphere</h1>
    <p>Para nosotrso es un gusto tenerte aqui</p>
    <img src="https://i.blogs.es/0ca9a6/aa/1366_2000.jpeg" alt="">
    `;

    Email.send({
        SecureToken : "6a9bc8b2-ce0f-4b3c-a759-017a6c2158bc",
        To : `${localStorage.getItem("correo")}`,
        From : "alextron45@gmail.com",
        Subject : "Prueba email otro app",
        Body : eBody
    }).then(
      message => alert(message)
    );
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



free.addEventListener("click", (e) => {
    pruevaCorreo()
    setTimeout(planFree, 3000);
});
plus.addEventListener("click", (e) => {
    pruevaCorreo()
    setTimeout(planPlus, 3000);
});
premiun.addEventListener("click", (e) => {
    pruevaCorreo()
    setTimeout(planPremiun, 3000);
});
