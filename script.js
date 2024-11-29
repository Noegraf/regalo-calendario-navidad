// Configuración inicial del calendario
const calendar = document.querySelector('.calendar');
const days = 24; // Días del calendario

// Generar días del calendario
for (let i = 1; i <= days; i++) {
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = i;
  calendar.appendChild(day);

  // Evento al hacer clic en un día
  day.addEventListener('click', () => {
    day.classList.add('opened');
    alert(`Abriendo el regalo del día ${i}`);
  });
}

const sheetURL = 'https://docs.google.com/spreadsheets/d/18P0dmAj8qpYbsvi_Obr5uU1rUfEdS_LYyeCKV2z-MBI/edit?usp=sharing';

// Función para cargar datos desde Google Sheets
async function loadData() {
  const response = await fetch(sheetURL);
  const data = await response.text();
  const rows = data.split('\n').slice(1); // Elimina la fila de encabezado

  rows.forEach(row => {
    const [day, image, gift] = row.split(',');

    const dayDiv = document.querySelector(`.day:nth-child(${day})`);
    if (dayDiv) {
      dayDiv.addEventListener('click', () => {
        dayDiv.classList.add('opened');
        alert(`Día ${day}: ${gift}`);
        // Puedes mostrar la imagen en un modal o ventana
      });
    }
  });
}

loadData();
