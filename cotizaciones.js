document.addEventListener('DOMContentLoaded', function() {
    function fetchFiles() {
        fetch('/api/files')
            .then(response => response.json())
            .then(data => {
                const tbody = document.querySelector('#files-table tbody');
                tbody.innerHTML = ''; // Limpiar el tbody antes de agregar nuevas filas

                data.forEach(file => {
                    const row = document.createElement('tr');

                    // Nombre del archivo
                    const nameCell = document.createElement('td');
                    nameCell.textContent = file.nombre_archivo;
                    row.appendChild(nameCell);

                    // Fecha de subida
                    const dateCell = document.createElement('td');
                    dateCell.textContent = new Date(file.fecha_subida).toLocaleDateString();
                    row.appendChild(dateCell);

                    // Acciones
                    const actionsCell = document.createElement('td');
                    const actionsDropdown = `
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button">
                                °°°
                            </button>
                            <div class="dropdown-content">
                                <a class="dropdown-item" href="#" onclick="viewFile(${file.id})">Ver</a>
                                <a href="#" onclick="editFile(${file.id})">Editar</a>
                                <a href="#" onclick="downloadFile(${file.id})">Descargar</a>
                            </div>
                        </div>
                    `;
                    actionsCell.innerHTML = actionsDropdown;
                    row.appendChild(actionsCell);

                    tbody.appendChild(row);
                });
            })
            .catch(error => console.error('Error al cargar los archivos:', error));
    }

    
    fetchFiles();

    
    setInterval(fetchFiles, 2000);
});

function viewFile(fileId) {
    // Construye la URL para abrir el archivo PDF
    const pdfUrl = `/api/view-pdf/${fileId}`;
    
    // Configura las opciones de la ventana emergente
    const windowFeatures = "width=800,height=600,scrollbars=yes,resizable=yes";
    
    // Abre una nueva ventana emergente para mostrar el PDF
    const pdfWindow = window.open(pdfUrl, '_blank', windowFeatures);
    
    
}

// Obtener el modal y el botón de cierre
const modal = document.getElementById("curtainsModal");
const closeModal = document.getElementsByClassName("close")[0];

// Función para mostrar el modal
function showModal() {
    modal.style.display = "block";
}

// Función para cerrar el modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Lógica para abrir el modal al hacer clic en "Editar"
function editFile(fileId) {
    // Mostrar el modal
    showModal();

    // Aquí puedes agregar lógica para cargar los datos del archivo si es necesario
    console.log("Editando archivo con ID: " + fileId);
}


function downloadFile(fileId) {
    // Construye la URL para descargar el archivo
    const downloadUrl = `/api/download-pdf/${fileId}`;

    // Redirige al usuario para descargar el archivo
    window.location.href = downloadUrl;
}
