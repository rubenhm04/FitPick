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


// Barra de buscar usuario
document.getElementById("searchButton").addEventListener("click", function () {
    let query = document.getElementById("searchInput").value.trim();
    if (query !== "") {
        setTimeout(() => {
            window.open(`https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`, "_blank");
        }, 500); // Simula recarga con un pequeño retraso
    }
});
