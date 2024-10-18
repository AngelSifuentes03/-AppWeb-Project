const calendar = document.getElementById('calendario');
const eventModal = document.getElementById('event-modal');
const modalDateSpan = document.getElementById('modal-date');
const modalEventsList = document.getElementById('modal-events-list');
const modalEventForm = document.getElementById('modal-event-form');
const modalEventTitleInput = document.getElementById('modal-event-title');
const closeModal = document.querySelector('.close');

const currentDate = new Date();
let events = [];
let selectedDate = null;

// Función para generar el calendario
function generateCalendar(date) {
    calendar.innerHTML = ''; // Limpia el contenido anterior

    // Obtiene el año, mes y día actual
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    // Elemento de cabecera del calendario
    const calendarHeader = document.createElement('div');
    calendarHeader.classList.add('calendar-header');

    // Botones para navegar entre meses
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar(currentDate);
    });

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Siguiente';
    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar(currentDate);
    });

    // Texto de mes y año
    const monthYearText = document.createElement('div');
    monthYearText.classList.add('month-year');
    monthYearText.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    // Añadir elementos de la cabecera al DOM
    calendarHeader.appendChild(prevButton);
    calendarHeader.appendChild(monthYearText);
    calendarHeader.appendChild(nextButton);
    calendar.appendChild(calendarHeader);

    // Elemento de la cuadrícula del calendario
    const calendarGrid = document.createElement('div');
    calendarGrid.classList.add('calendar-grid');

    // Obtiene el primer día del mes
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Días de la semana
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });

    // Añade días vacíos antes del primer día del mes
    const firstDayOfWeek = firstDayOfMonth.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'inactive');
        calendarGrid.appendChild(emptyDay);
    }

    // Añade los días del mes
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        // Resalta el día actual
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        // Manejar el clic en el día
        dayElement.addEventListener('click', () => {
            selectedDate = new Date(year, month, day);
            showModal(selectedDate);
        });

        calendarGrid.appendChild(dayElement);
    }

    calendar.appendChild(calendarGrid);
}

// Mostrar el modal con eventos para la fecha seleccionada
function showModal(date) {
    const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    modalDateSpan.textContent = date.toLocaleDateString();
    modalEventsList.innerHTML = '';

    const eventsForDate = events.filter(event => event.date === formattedDate);
    eventsForDate.forEach(event => {
        const listItem = document.createElement('li');
        listItem.id = 'event'; // Asignar ID 'event' a cada elemento de la lista
        listItem.textContent = event.title;
        modalEventsList.appendChild(listItem);
    });

    eventModal.style.display = 'block';
}

// Añadir evento desde el modal
modalEventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (selectedDate && modalEventTitleInput.value) {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        events.push({ date: formattedDate, title: modalEventTitleInput.value });
        localStorage.setItem('events', JSON.stringify(events)); // Guardar eventos en localStorage
        generateCalendar(currentDate);
        modalEventForm.reset();
        showModal(selectedDate);
    }
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

// Cargar eventos del localStorage al inicializar
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
    }
}

// Inicializar el calendario
loadEvents(); // Cargar eventos al inicio
generateCalendar(currentDate);
