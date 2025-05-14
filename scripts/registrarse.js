document.addEventListener('DOMContentLoaded', () => {
    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const registerButton = document.getElementById('registerButton');
    const registerForm = document.getElementById('registerForm');

    function checkInputs() {
        if (name.value.trim() !== '' && surname.value.trim() !== '' && email.value.trim() !== '' && password.value.trim() !== '') {
            registerButton.classList.add('active');
            registerButton.disabled = false;
        } else {
            registerButton.classList.remove('active');
            registerButton.disabled = true;
        }
    }

    name.addEventListener('input', checkInputs);
    surname.addEventListener('input', checkInputs);
    email.addEventListener('input', checkInputs);
    password.addEventListener('input', checkInputs);

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });
});