const d = document,
    tituloName = d.getElementById('titulo-name'),
    salir = d.getElementById('salir');

if ( !localStorage.getItem("id") ) {
    window.location = "../../index.html";
}    

let user = {}

const getAll = async () => {
    try {
        let res = await fetch("http://localhost:3000/usuarios/"),
        json = await res.json();

        for (let i = 0; i < json.length; i++) {
            if ( json[i].id == localStorage.getItem("id") ) {
                user = {
                    id: json[i].id,
                    nombre: json[i].nombre,
                    correo: json[i].correo,
                    contrasena: json[i].contrasena,
                    telefono: json[i].telefono,
                    plan: json[i].plan
                }
            }
        }

        tituloName.textContent = `Hola, ${user.nombre}!`;

    } catch (error) {
        console.log(error);
    }
}

getAll();



salir.addEventListener("click", () => {
    localStorage.removeItem("id");
    localStorage.removeItem("status");
    localStorage.removeItem("mode");
    window.location.reload();
})
