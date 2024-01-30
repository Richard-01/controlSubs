

let notificationEnabled = false;

function toggleNotification() {
    notificationEnabled = !notificationEnabled;
    const button = document.getElementById('notificationButton');

    if (notificationEnabled) {
        button.textContent = 'Desactivar Notificación';
        // Aquí puedes agregar la lógica para mostrar la notificación
        // Puedes usar la API de Notificaciones de JavaScript
        // Ejemplo básico:
        // if (Notification.permission === "granted") {
        //     new Notification("¡Notificación activada!");
        // } else if (Notification.permission !== "denied") {
        //     Notification.requestPermission().then(permission => {
        //         if (permission === "granted") {
        //             new Notification("¡Notificación activada!");
        //         }
        //     });
        // }
    } else {
        button.textContent = 'Activar Notificación';
        // Puedes agregar la lógica para desactivar la notificación aquí si es necesario
    }
}
