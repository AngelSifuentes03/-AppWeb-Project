document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logout-button');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const fullname = loginForm.fullname.value;
            const password = loginForm.password.value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Asegúrate de incluir las cookies
                body: JSON.stringify({ fullname, password }) 
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    alert('Invalid login');
                }
            })
            .catch(error => {
                console.error('Error:', error); 
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const fullname = registerForm.fullname.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;

            // Validar contraseña antes de enviarla
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
            if (!passwordPattern.test(password)) {
                alert('La contraseña debe tener al menos 8 caracteres e incluir letras mayúsculas y minúsculas, números y símbolos.');
                return;
            }

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Asegúrate de incluir las cookies
                body: JSON.stringify({ fullname, email, password }) 
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/HTML/home.html';
                } else {
                    alert('Registration failed');
                }
            })
            .catch(error => {
                console.error('Error:', error); 
            });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            fetch('/logout', {
                method: 'POST',
                credentials: 'include' // Asegúrate de incluir las cookies
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else {
                    alert('Logout failed');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Verificar autenticación en páginas protegidas
    const protectedPages = ['/HTML/admin.html', '/HTML/home.html'];
    if (protectedPages.includes(window.location.pathname)) {
        fetch('/check-auth', {
            method: 'GET',
            credentials: 'include' // Asegúrate de incluir las cookies
        })
        .then(response => {
            if (!response.ok) {
                window.location.href = '/index.html'; // Redirige al login si no está autenticado
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
