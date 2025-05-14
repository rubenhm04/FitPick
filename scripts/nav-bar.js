document.addEventListener('DOMContentLoaded', function() {
    // Obtener los enlaces de "MiArmario" y "MiOutfitDiario"
    const miColeccionLink = document.getElementById('miColeccion-link');
    const miOutfitLink = document.getElementById('miOutfitDiario');
    const explorarLink = document.getElementById('comprar');
    const usuarioLink = document.getElementById('usuario');
    const redsocialLink = document.getElementById('redSocial');

    

    // Verificar la página actual y añadir la clase 'active' al enlace correspondiente
    if (window.location.pathname.includes('miColeccion.html')) {
        miColeccionLink.classList.add('active');
    } else if (window.location.pathname.includes('mostrarOutfit.html')) {
        miOutfitLink.classList.add('active');
    } else if (window.location.pathname.includes('mostrarOutfit-FotoFinal.html')) {
        miOutfitLink.classList.add('active');
    } else if (window.location.pathname.includes('comprar.html')) {
        explorarLink.classList.add('active');
    } else if (window.location.pathname.includes('confGeneral.html')) {
        usuarioLink.classList.add('active');
    } else if (window.location.pathname.includes('confEspecifica.html')) {
        usuarioLink.classList.add('active');
    } else if (window.location.pathname.includes('confPermisos.html')) {
        usuarioLink.classList.add('active');
    } else if (window.location.pathname.includes('indexSesionIniciada.html')) {
        redsocialLink.classList.add('active');
    }
    
});