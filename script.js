// Obtener el enlace de Google Sheets desde la URL
const urlParams = new URLSearchParams(window.location.search);
const sheetURL = urlParams.get('sheet');

if (!sheetURL) {
  alert('No se encontró ningún enlace de Google Sheets. Por favor, genera tu calendario.');
  throw new Error('URL de Google Sheets no encontrada.');
}

// Configuración inicial del calendario
const calendar = document.querySelector('.calendar');
const days = 24; // Días del calendario

// Obtener la fecha actual
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Meses en JavaScript van de 0 a 11

// Asegurarnos de que sea diciembre
if (currentMonth !== 12) {
  alert('Este calendario solo funciona en diciembre.');
}

// Función para cargar datos desde Google Sheets y procesarlos
async function loadData() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) {
      throw new Error('Error al cargar el archivo CSV.');
    }

    const csvText = await response.text();
    const rows = csvText.split('\n'); // Dividir el texto en filas
    const data = rows.map(row => row.split(',')); // Separar columnas por coma

    // Generar los días del calendario y añadir eventos
    for (let i = 1; i <= days; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';
      dayDiv.textContent = i;

      // Bloquear días futuros
      if (i > currentDay) {
        dayDiv.classList.add('locked'); // Clase para días bloqueados
        dayDiv.textContent = '🔒';
      } else {
        // Evento al hacer clic en días desbloqueados
        dayDiv.addEventListener('click', () => {
          if (parseInt(dayDiv.textContent) <= currentDay && currentMonth === 12) {
            dayDiv.classList.add('opened');
            const [day, image, gift] = data[i - 1]; // Obtener datos de la fila correspondiente

            // Mostrar una ventana emergente con la información del regalo
            if (image && gift) {
              const giftWindow = window.open('', '_blank');
              giftWindow.document.write(`
                <h1>Regalo del Día ${i}</h1>
                <img src="${image.trim()}" alt="Regalo" style="width: 300px;">
                <p>${gift.trim()}</p>
              `);
            } else {
              alert('No hay datos disponibles para este día.');
            }
          }
        });
      }

      calendar.appendChild(dayDiv);
    }
  } catch (error) {
    console.error('Error al cargar y procesar los datos:', error);
    alert('Hubo un error al cargar los datos de la hoja de cálculo.');
  }
}

// Cargar los datos al cargar la página
loadData();
