document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Abrir menú');
    document.querySelector('.nav-bar').prepend(hamburger);

    const navLinks = document.querySelectorAll('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.toggle('active'));
    });
});