// Filtrar y buscar telas
document.querySelectorAll('.select-filter-t').forEach(select => {
    select.addEventListener('change', fetchFabricData);
});
document.querySelectorAll('.search-input-t').forEach(input => {
    input.addEventListener('input', fetchFabricData);
});

function fetchFabricData() {
    document.querySelectorAll('.select-filter-t').forEach(select => {
        const filterT = select.value;
        const searchTermT = select.parentElement.querySelector('.search-input-t').value;

        fetch(`/api/filterT?filter=${filterT}&searchTerm=${searchTermT}`)
            .then(response => response.json())
            .then(data => {
                const tableContainer = select.closest('.form-group').querySelector('.table-container-t');
                tableContainer.innerHTML = ''; 

                if (data.length > 0) {
                    let table = '<table><tr><th>Seleccionar</th><th> Nombre </th><th> Ancho </th><th> Precio </th></tr>';
                    data.forEach(item => {
                        table += `<tr>
                                    <td><input type="radio" name="telaRadio" class="telaRadio" value="${item.nombre}" data-price="${item.precio}" data-ancho="${item.ancho}"></td>
                                    <td>${item.nombre}</td>
                                    <td>${item.ancho} </td>
                                    <td>$${item.precio.toFixed(2)}</td>
                                  </tr>`;
                    });
                    table += '</table>';
                    tableContainer.innerHTML = table;
                } else {
                    tableContainer.innerHTML = 'No se encontraron resultados';
                }
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    });
}

// Llamar a la función para precargar datos al cargar la página
window.onload = () => {
    fetchFabricData(); // Carga inicial
    document.querySelectorAll('.select-filter-t').forEach(select => {
        fetchFabricData(select); // Precarga para cada select ya existente
    });
};

// Manejar la selección de telas
document.querySelectorAll('.table-container-t').forEach(tableContainer => {
    tableContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('telaRadio')) {
            const selectedRadio = event.target;
            const telaName = selectedRadio.value;
            const telaPrice = parseFloat(selectedRadio.getAttribute('data-price')) || 0;
            const telaAncho = parseFloat(selectedRadio.getAttribute('data-ancho')) || 0; 

            // Actualizar el campo de búsqueda con el nombre de la tela seleccionada
            document.querySelector('input[name="buscar[]"]').value = telaName;

            // Colocar el precio en el campo oculto
            document.querySelector('.precio').value = telaPrice;

            // Colocar el ancho en el campo oculto
            document.querySelector('.ancho_tela').value = telaAncho;
        }
    });
});


