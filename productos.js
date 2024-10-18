// Filtrar y buscar PRODUCTOS
document.querySelectorAll('.select-filter-a').forEach(select => {
    select.addEventListener('change', fetchProductData);
});
document.querySelectorAll('.search-input-a').forEach(input => {
    input.addEventListener('input', fetchProductData);
});

function fetchProductData() {
    // Iterar sobre cada select para obtener datos
    document.querySelectorAll('.select-filter-a').forEach(select => {
        const filter = select.value;  // Obtén el valor del select
        const searchTerm = select.parentElement.querySelector('.search-input-a').value;  // Obtén el término de búsqueda

        // Realiza la llamada a la API
        fetch(`/api/filter?filter=${filter}&searchTerm=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const tableContainer_a = select.closest('.form-group').querySelector('.table-container-a');
                tableContainer_a.innerHTML = '';  // Limpia el contenido previo

                if (data.length > 0) {
                    let table = '<table><tr><th>Seleccionar</th><th>Nombre</th><th>Precio</th></tr>';
                    data.forEach(item => {
                        table += `<tr>
                                    <td><input type="radio" name="PDRadio" class="PDRadio" value="${item.nombre}" data-price="${item.precio}"></td>
                                    <td>${item.nombre}</td>
                                    <td>$${item.precio.toFixed(2)}</td>
                                  </tr>`;
                    });
                    table += '</table>';
                    tableContainer_a.innerHTML = table;  // Inserta la nueva tabla
                } else {
                    tableContainer_a.innerHTML = 'No se encontraron resultados';
                }
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    });
}


// Llamar a la función para precargar datos al cargar la página
window.onload = () => {
    fetchProductData(); // Carga inicial
    document.querySelectorAll('.select-filter-a').forEach(select => {
        fetchProductData(select); // Precarga para cada select ya existente
    });
};

// Manejar la selección 
document.querySelectorAll('.table-container-a').forEach(tableContainer_a => {
    tableContainer_a.addEventListener('change', function(event) {
        if (event.target.classList.contains('PDRadio')) {
            const PDselectedRadio = event.target;
            const PDName = PDselectedRadio.value;
            const PDPrice = parseFloat(PDselectedRadio.getAttribute('data-price')) || 0;

            // Actualizar el campo 
            document.querySelector('input[name="producto[]"]').value = PDName;

            // Colocar el precio 
            document.querySelector('.precioPA').value = PDPrice;
        }
    });
});

