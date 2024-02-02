const modal = document.getElementById('myModal');
const modalOverlay = document.getElementById('modalOverlay');
const btn = document.getElementById('btn');

btn.onclick = () => {
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
};
const closeModal = () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
};

let userId = "";

const URL = "http://localhost:3000/usuarios/";

const getAll = async () => {
    try {
        let res = await fetch(URL),
            json = await res.json();

        for (let i = 0; i < json.length; i++) {
            if (json[i].id == localStorage.getItem("id")) {
                userId = json[i].id;
                break;
            }
        }
        const suscripcionesContainer = document.getElementById('suscripciones-container');
        const contentSubsContainer = document.querySelector('.content-Subs');

        suscripcionesContainer.innerHTML = '';

        if (user.subs && user.subs.length > 0) {
            contentSubsContainer.style.display = 'none';
        } else {
            contentSubsContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al identificar el ID:', error.message);
        alert(error.message);
    }
};

const getMaxSubsAllowed = (plan) => {
    switch (plan.toLowerCase()) {
        case 'plus':
            return 6;
        case 'free':
            return 2;
        case 'premiun':
            return 12;
        default:
            throw new Error('Tipo de plan no reconocido.');
    }
};

const addSubscription = async () => {
    try {
        const plataforma = document.getElementById('plataforma').value;
        const frecuenciaSelect = document.getElementById('frecuencia');
        const frecuencia = frecuenciaSelect.options[frecuenciaSelect.selectedIndex].value;
        const precio = parseFloat(document.getElementById('precio').value);

        //const fecha = new Date().toISOString();
        const precioFormateado = precio.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        const subscriptionData = {
            plataforma,
            frecuencia,
            precio: precioFormateado,
            //fecha
        };

        if (!plataforma || !frecuencia || !precio || isNaN(parseFloat(precio))) {
            throw new Error('Por favor, complete todos los campos correctamente y digite un campo numérico.');
        }

        const userId = localStorage.getItem("id");
        const userResponse = await fetch(`http://localhost:3000/usuarios/${userId}`);

        if (!userResponse.ok) {
            throw new Error('Error al obtener la información del usuario. Por favor, inténtelo de nuevo.');
        }

        const userData = await userResponse.json();
        console.log('Información del usuario:', userData);

        const maxSubsAllowed = getMaxSubsAllowed(userData.plan);
        if (!userData.subs) {
            userData.subs = [];
        }

        if (userData.subs.length >= maxSubsAllowed) {
            closeModal();
            throw new Error(`No puedes agregar más de ${maxSubsAllowed} suscripciones.`);
        }

        if (!userData.subs) {
            userData.subs = [];
        }

        userData.subs.push(subscriptionData);

        const updateUserResponse = await fetch(`http://localhost:3000/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!updateUserResponse.ok) {
            throw new Error('Error al actualizar la información del usuario. Por favor, inténtelo de nuevo.');
        }

        const updatedUserData = await updateUserResponse.json();
        console.log('Información del usuario actualizada:', updatedUserData);

        document.getElementById('plataforma').value = '';
        frecuenciaSelect.value = '';
        document.getElementById('precio').value = '';

        closeModal();
    } catch (error) {
        console.error('Error al agregar suscripción:', error.message);
        alert(error.message);
    }
};