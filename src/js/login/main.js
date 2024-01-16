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
    telefono = d.getElementById('telefono'),
    cambio = d.getElementById('cambio'),
    volver = d.getElementById('volver'),
    alert = d.getElementById('alert'),
    inputPhone = d.getElementById('input-phone')

cambio.addEventListener("click", () => {
    if ( cambio.textContent == "Crear cuenta" ) {
        cambio.textContent = "Inicia sesion";
        tituloPrincipal.textContent = "Bienvenido";
        parrafoPrincipal.textContent = "Crea una cuenta para ingresar!";
        imagen.src = "../../img/login/Mobile login-pana.svg";
        inputSor.removeAttribute("hidden");
        inputPhone.removeAttribute("hidden");
        olvContra.setAttribute("hidden", true);
        btnPrincipal.textContent = "Crear cuenta";
        cuenta.textContent = "Ya tienes una cuenta?";
    } else {
        cambio.textContent = "Crear cuenta";
        tituloPrincipal.textContent = "Hola de nuevo!";
        parrafoPrincipal.textContent = "Inicia sesion para ingresar!";
        imagen.src = "../../img/login/Login-amico.svg";
        inputPhone.setAttribute("hidden", true);
        inputSor.setAttribute("hidden", true);
        olvContra.removeAttribute("hidden");
        btnPrincipal.textContent = "Iniciar sesion";
        cuenta.textContent = "No tienes una cuenta?";
    }
});

volver.addEventListener("click", () => {
    window.location = "../../index.html";
});

const text = (txt) => {
    alert.setAttribute("hidden", true);
    alert.firstElementChild.firstElementChild.firstElementChild.textContent = txt;
    alert.addEventListener("click", () => {
        window.location.reload();
    });
}

alert.addEventListener("click", text );

btnPrincipal.addEventListener("click", async () => {
    if ( btnPrincipal.textContent === "Iniciar sesion" ) {
        if ( correo.value === "" || contrasena.value === "" ) {
            text("Debes rellenar todos los campos");
            alert.removeAttribute("hidden");
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
                        window.location = "../../components/dashboard/main.html";
                    } else {
                        text("Usuario o contraseña incorrectos");
                        alert.removeAttribute("hidden");
                    }

                } catch (error) {
                    console.log(error);
                }
            }
        } else {
        if ( nombre.value === "" || correo.value === "" || contrasena.value === "" || telefono.value == "" ) {
            text("Debes rellenar todos los campos");
            alert.removeAttribute("hidden");
        } else {
            if ( correo.value.length < 5 || contrasena.value.length < 5 ) {
                text("El usuario y la contraseña deben tener mas de 5 caracteres");
                alert.removeAttribute("hidden");
            } else {
                if ( typeof telefono.value === String ) {
                    text("El numero de celular solo permite numeros");
                    alert.removeAttribute("hidden");
                } else {
                    if ( telefono.value.length <= 9 ) {
                        text("El numero de celular debe tener mas de 10 caracteres");
                        alert.removeAttribute("hidden");
                    } else {
                        if ( !correo.value.includes("@") ) {
                            text("El correo ingresado no es valido, debe contener '@'");
                            alert.removeAttribute("hidden");
                        } else {
                            if ( nombre.value.length < 2 ) {
                                text("El nombre no puede estar vacio");
                                alert.removeAttribute("hidden");
                            } else {
                                try {
                                    let res = await fetch("http://localhost:3000/usuarios/"),
                                    json = await res.json();
        
                                    let correoUse = false;
                                    let numeroUse = false;
                                    
                                    for (let i = 0; i < json.length; i++) {
                                        if ( json[i].correo === correo.value ) {
                                            correoUse = true;
                                        }
                                    }

                                    for (let i = 0; i < json.length; i++) {
                                        if ( json[i].telefono === telefono.value ) {
                                            numeroUse = true;
                                        }
                                    }

                                    if ( numeroUse === true ) {
                                        text("El numero de celular ya esta en uso");
                                        alert.removeAttribute("hidden");
                                    } else {
                                        if ( correoUse === true ) {
                                            text("El correo ingresado ya esta en uso");
                                            alert.removeAttribute("hidden");
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
                                                    telefono: telefono.value,
                                                    plan: ""
                                                })
                                            },
                                            res = await fetch("http://localhost:3000/usuarios/", options),
                                            json = await res.json();
            
                                            localStorage.setItem("id", json.id);
                                            localStorage.setItem("nombre", nombre.value);
                                            localStorage.setItem("correo", correo.value);
                                            localStorage.setItem("contrasena", contrasena.value);
                                            localStorage.setItem("telefono", telefono.value);
                                            window.location = "./planes.html";
                                        }
                                    }
        
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
