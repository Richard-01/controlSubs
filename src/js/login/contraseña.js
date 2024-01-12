const d = document,
  btnSubmit = d.getElementById("btn-submit"),
  sectId = d.getElementById("sect-id"),
  nombre = d.getElementById("nombre"),
  alert = d.getElementById("alert"),
  correo = d.getElementById("correo");

const text = (txt) => {
    alert.setAttribute("hidden", true);
    alert.firstElementChild.firstElementChild.firstElementChild.textContent = txt;
    alert.addEventListener("click", () => {
        window.location.reload();
    });
}

alert.addEventListener("click", text );

btnSubmit.addEventListener("click", async () => {
  sectId.textContent = "";
  const rueda = document.createRange().createContextualFragment(`
    <div class="rueda"></div>
    `);
  sectId.append(rueda);
  setTimeout(async () => {
    if (nombre.value == "" || correo.value == "") {
        const img = document.createRange().createContextualFragment(`
        <img src="../../img/login/Login-rafiki.svg" alt="">
        `);
        sectId.textContent = "";
        sectId.append(img);
        text("Debes rellenar todos los campos");
        alert.removeAttribute("hidden");
    } else {
      try {
        let res = await fetch("http://localhost:3000/usuarios/"),
          userVerific,
          userName,
          userEmail,
          userPass,
          json = await res.json();
          console.log(json);
        for (let i = 0; i < json.length; i++) {
          if ( json[i].nombre == nombre.value && json[i].correo == correo.value ) {
            userVerific = true;
            userName = json[i].nombre;
            userEmail = json[i].correo;
            userPass = json[i].contrasena;
            break;
          } else {
            userVerific = false;
          }
        }
        if (userVerific == true) {
          const elemento = document.createRange().createContextualFragment(`
            <div class="card-user">
                <h2>Hola ${userName}!</h2>
                <div class="txt-card">
                    <label>Tu correo es:</label>
                    <input type="text" value="${userEmail}" id="nombreR" disabled>
                    <label>Tu contraseña es:</label>
                    <input type="text" value="${userPass}" id="contraR" disabled>
                </div>
                <div class="btn-card">
                    <p>Intenta no olvidarla!</p>
                    <button class="btn-olv"><a href="./index.html">volver</a></button>
                </div>
            </div>
            `);
            sectId.textContent = "";
            sectId.append(elemento);
        } else {
            const img = document.createRange().createContextualFragment(`
            <img src="../../img/login/Login-rafiki.svg" alt="">
            `);
            sectId.textContent = "";
            sectId.append(img);
            text("Ese usuario no fue encontrado intenta nuevamente...");
            alert.removeAttribute("hidden");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, 1000);
});
