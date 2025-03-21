// Inciar Sesión
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("iniciarSesion").addEventListener("click", function (event) {
        event.preventDefault(); // Evita la navegación normal del enlace
        window.open("iniciarSesion.html", "_blank"); // Abre en una nueva pestaña
    });
});

// Mostrar el desplegable con el outfit
document.getElementById("mostrarOutfit").addEventListener("click", function() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "flex"; // Muestra el fondo difuso con la imagen
});

// Cerrar el desplegable
document.getElementById("cerrarOutfit").addEventListener("click", function() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Oculta el fondo y la imagen
});