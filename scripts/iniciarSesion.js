document.querySelector('.btn-login').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Verifica si la ventana principal está abierta
    if (window.opener) {
        window.opener.location.href = 'index.html'; // Cambia esto si la URL es diferente
    }

    window.close(); // Cierra la pestaña actual
});