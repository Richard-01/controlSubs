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
    try {
        const plataforma = document.getElementById('plataforma').value;
        const frecuenciaSelect = document.getElementById('frecuencia');
        const frecuencia = frecuenciaSelect.options[frecuenciaSelect.selectedIndex].value;
        const precio = document.getElementById('precio').value;

        const subscriptionData = {
            plataforma,
            frecuencia,
            precio
        };

        if (!plataforma || !frecuencia || !precio) {
            throw new Error('Por favor, complete todos los campos correctamente.');
        }else if (isNaN(parseFloat(precio))) {
            throw new Error('Por favor, digite un campo numerico.');
        }

        const response = await fetch('http://localhost:3000/plataformas/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriptionData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar suscripción. Por favor, inténtelo de nuevo.');
        }

        const data = await response.json();
        console.log('Suscripción agregada:', data);

        document.getElementById('plataforma').value = '';
        frecuenciaSelect.value = '';
        document.getElementById('precio').value = '';

        closeModal();
    } catch (error) {
        console.error('Error al agregar suscripción:', error.message);
        alert(error.message);
    }
};