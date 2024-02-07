const d = document,
redirUno = d.getElementById('redir-uno'),
redirDos = d.getElementById('redir-dos'),
redirTres = d.getElementById('redir-tres')

// rediccionar el usuario al login
redirUno.addEventListener('click', () => {
    window.location = "./components/login/index.html";
})
redirDos.addEventListener('click', () => {
    window.location = "./components/login/index.html";
})
redirTres.addEventListener('click', () => {
    window.location = "./components/login/index.html";
})

const btnUp = d.getElementById('up');

//Se desplaza a la parte superior de la página cuando se pulsa el botón "up"
window.addEventListener('scroll',(e)=>{
    let y = d.documentElement.scrollTop;
    if (y <= 0) {
        btnUp.classList.add('hide');
        btnUp.classList.remove('active');
    } else if (y > window.innerHeight) {
        btnUp.classList.remove('hide');
        btnUp.classList.add('active');
    }
});

d.addEventListener('click', (e) => {
    if(e.target === btnUp || e.target.matches('.uil-arrow-up')){
        window.scrollTo({
            behavior: 'smooth',
            top: 0
        });
    }
});
