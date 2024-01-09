const d = document,
    tituloPrincipal = d.getElementById('titulo-p'),
    parrafoPrincipal = d.getElementById('parrafo-p'),
    imagen = d.getElementById('imagen'),
    inputSor = d.getElementById('input-sor'),
    olvContra = d.getElementById('olv-contra'),
    cuenta = d.getElementById('cuenta'),
    btnPrincipal = d.getElementById('btn-p'),
    nombre = d.getElementById('nombre'),
    correo = d.getElementById('correo'),
    contrasena = d.getElementById('contrasena'),
    cambio = d.getElementById('cambio')

cambio.addEventListener("click", () => {
    if ( cambio.textContent == "Crear cuenta" ) {
        cambio.textContent = "Inicia sesion";
        tituloPrincipal.textContent = "Bienvenido";
        parrafoPrincipal.textContent = "Crea una cuenta para ingresar!";
        imagen.src = "../../img/login/Mobile login-pana.svg";
        inputSor.removeAttribute("hidden");
        olvContra.setAttribute("hidden", true);
        btnPrincipal.textContent = "Crear cuenta";
        cuenta.textContent = "Ya tienes una cuenta?";
    } else {
        cambio.textContent = "Crear cuenta";
        tituloPrincipal.textContent = "Hola de nuevo!";
        parrafoPrincipal.textContent = "Inicia sesion para ingresar!";
        imagen.src = "../../img/login/Login-amico.svg";
        inputSor.setAttribute("hidden", true);
        olvContra.removeAttribute("hidden");
        btnPrincipal.textContent = "Iniciar sesion";
        cuenta.textContent = "No tienes una cuenta?";
    }
});

btnPrincipal.addEventListener("click", async () => {
    if ( btnPrincipal.textContent === "Iniciar sesion" ) {
        if ( correo.value === "" || contrasena.value === "" ) {
            alert("Debes rellenar todos los campos");
        } else  {
                try {
                    let res = await fetch("http://localhost:3000/usuarios/"),
                    json = await res.json();

                    let userVerified = false;

                    for (let i = 0; i < json.length; i++) {
                        if ( json[i].correo === correo.value && json[i].contrasena === contrasena.value ) {
                            userVerified = true;
                            localStorage.setItem("id", json[i].id);
                        }    
                    }

                    if ( userVerified == true ) {
                        window.location = "inicio.html";
                    } else {
                        alert("Usuario o contraseña incorrectos");
                    }


                } catch (error) {
                    console.log(error);
                }
            }
        } else {
        if ( nombre.value === "" || correo.value === "" || contrasena.value === "" ) {
            alert("Debes rellenar todos los campos");
        } else {
            if ( correo.value.length < 5 || contrasena.value.length < 5 ) {
                alert("El usuario y la contraseña deben tener mas de 5 caracteres");
            } else {
                if ( !correo.value.includes("@") ) {
                    alert("El correo ingresado no es valido, debe contener '@'");
                } else {
                    if ( nombre.value.length < 2 ) {
                        alert("El nombre no puede estar vacio");
                    } else {
                        try {
                            let res = await fetch("http://localhost:3000/usuarios/"),
                            json = await res.json();

                            let correoUse = false;
                            
                            for (let i = 0; i < json.length; i++) {
                                if ( json[i].correo === correo.value ) {
                                    correoUse = true;
                                }
                            }

                            if ( correoUse === true ) {
                                alert("El correo ingresado ya esta en uso");
                            } else {
                                let options = {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json; charset=utf-8"
                                    },
                                    body: JSON.stringify({
                                        nombre: nombre.value,
                                        correo: correo.value,
                                        contrasena: contrasena.value,
                                        plan: ""
                                    })
                                },
                                res = await fetch("http://localhost:3000/usuarios/", options),
                                json = await res.json();

                                localStorage.setItem("id", json.id);
                                localStorage.setItem("nombre", nombre.value);
                                localStorage.setItem("correo", correo.value);
                                localStorage.setItem("contrasena", contrasena.value);
                                window.location = "planes.html";
                            }

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        }
    }
});
