document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const loginForm = document.getElementById('loginForm');

    function checkInputs() {
        if (email.value.trim() !== '' && password.value.trim() !== '') {
            loginButton.classList.add('active');
            loginButton.disabled = false;
        } else {
            loginButton.classList.remove('active');
            loginButton.disabled = true;
        }
    }

    email.addEventListener('input', checkInputs);
    password.addEventListener('input', checkInputs);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'indexSesionIniciada.html';
    });
});