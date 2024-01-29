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

const addSubscription = async () => {
    const plataforma = document.getElementById('plataforma').value;
    const frecuencia = document.getElementById('frecuencia').value;
    const precio = document.getElementById('precio').value;

    const subscriptionData = {
        plataforma,
        frecuencia,
        precio
    };

    try {
        const response = await fetch('http://localhost:3000/plataformas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriptionData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar suscripción');
        }

        const data = await response.json();
        console.log('Suscripción agregada:', data);
        closeModal();
        
        document.getElementById('plataforma').value = '';
        document.getElementById('frecuencia').value = '';
        document.getElementById('precio').value = '';
    } catch (error) {
        console.error('Error al agregar suscripción:', error.message);
    }
};