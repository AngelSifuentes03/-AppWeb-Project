document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById('users-tbody');
            tbody.innerHTML = ''; // Limpiar el tbody

            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="${user.is_blocked ? 'unblock-btn' : 'block-btn'}" data-id="${user.id}">
                            ${user.is_blocked ? 'Desbloquear' : 'Bloquear'}
                        </button>
                        <button class="delete-btn" data-id="${user.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            // Manejar el botón de bloquear/desbloquear
            document.querySelectorAll('.block-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    fetch(`/api/users/${userId}/block`, { method: 'POST' })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Usuario bloqueado.');
                                this.textContent = 'Desbloquear';
                                this.classList.remove('block-btn');
                                this.classList.add('unblock-btn');
                            } else {
                                alert('Error al bloquear al usuario.');
                            }
                        });
                });
            });

            document.querySelectorAll('.unblock-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    fetch(`/api/users/${userId}/unblock`, { method: 'POST' })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Usuario desbloqueado.');
                                this.textContent = 'Bloquear';
                                this.classList.remove('unblock-btn');
                                this.classList.add('block-btn');
                            } else {
                                alert('Error al desbloquear al usuario.');
                            }
                        });
                });
            });

            // Manejar el botón de eliminar
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const userId = this.getAttribute('data-id');
                    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                        fetch(`/api/users/${userId}`, { method: 'DELETE' })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    alert('Usuario eliminado.');
                                    location.reload(); // Recargar la página para actualizar la lista
                                } else {
                                    alert('Error al eliminar al usuario.');
                                }
                            });
                    }
                });
            });
        });
});
