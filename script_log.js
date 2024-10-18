// Añade un evento de click al botón "Registrarse" para mostrar el formulario de registro
document.getElementById('sign-up').addEventListener('click', function() {
    document.getElementById('login-form').classList.add('hide');
    document.getElementById('register-form').classList.remove('hide');
});

// Añade un evento de click al botón "Iniciar Sesión" para mostrar el formulario de inicio de sesión
document.getElementById('sign-in').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hide');
    document.getElementById('register-form').classList.add('hide');
});


