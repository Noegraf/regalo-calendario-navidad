// Obtener el parámetro 'sheet' de la URL
const urlParams = new URLSearchParams(window.location.search);
const sheetURL = urlParams.get('sheet');

if (!sheetURL) {
  alert('No se encontró ningún enlace de Google Sheets. Por favor, genera tu calendario.');
} else {
  console.log('URL de la hoja:', sheetURL);

  // Aquí iría la lógica para cargar la hoja de cálculo desde el enlace dado.
  // Por ejemplo, si usas fetch() para obtener los datos de la hoja:
  fetch(sheetURL)
    .then(response => response.text())
    .then(data => {
      console.log('Datos de la hoja de cálculo:', data);
      // Aquí podrías agregar la lógica para procesar y mostrar los datos en el calendario
    })
    .catch(error => {
      console.error('Error al cargar la hoja de cálculo:', error);
      alert('Hubo un error al cargar los datos de la hoja de cálculo.');
    });
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

// Función para cargar datos desde Google Sheets
async function loadData() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) {
      throw new Error('No se pudo acceder a los datos de Google Sheets.');
    }

    const data = await response.text();
    const rows = data.split('\n'); // Dividir por filas

    rows.forEach(row => {
      const [day, image, gift] = row.split(',');

      const dayDiv = document.querySelector(`.day:nth-child(${day})`);
      if (dayDiv) {
        dayDiv.addEventListener('click', () => {
          if (parseInt(day) <= currentDay && currentMonth === 12) {
            dayDiv.classList.add('opened');
            const giftWindow = window.open('', '_blank');
            giftWindow.document.write(`
              <h1>Regalo del Día ${day}</h1>
              <img src="${image}" alt="Regalo" style="width: 300px;">
              <p>${gift}</p>
            `);
          }
        });
      }
    });
  } catch (error) {
    console.error('Error cargando los datos:', error);
    alert('Ocurrió un error al cargar los datos. Por favor, verifica el enlace de Google Sheets.');
  }
}

// Generar días del calendario
for (let i = 1; i <= days; i++) {
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = i;

  // Bloquear días futuros
  if (i > currentDay) {
    day.classList.add('locked'); // Clase para días bloqueados
    day.textContent = '🔒';
  }

  calendar.appendChild(day);
}

// Cargar los datos
loadData();
