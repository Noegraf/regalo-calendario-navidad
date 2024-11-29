
// === CONFIGURACIÓN DEL CALENDARIO DE ADVIENTO ===

// Obtener el enlace de Google Sheets desde la URL o usar uno predeterminado para pruebas
const urlParams = new URLSearchParams(window.location.search);
const sheetURL = urlParams.get('sheet') || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRyTr96HrCfWEEsT39Wlz80ic3StIzyifsIixrLnYHFoamFMkbHv8YosSwut0Si1p_C69q8G4c2MJg_/pub?gid=0&single=true&output=csv';

if (!sheetURL) {
  alert('No se encontró ningún enlace de Google Sheets. Por favor, genera tu calendario.');
}

// Configuración inicial
const calendar = document.querySelector('.calendar');
const days = 24; // Número de días del calendario
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Los meses en JavaScript son 0-indexados

// Verificar que sea diciembre
if (currentMonth !== 12) {
  alert('Este calendario solo funciona en diciembre.');
}

// === GENERAR EL CALENDARIO VISUAL ===
for (let i = 1; i <= days; i++) {
  const day = document.createElement('div');
  day.className = 'day';
  day.textContent = i;

  // Bloquear días futuros
  if (i > currentDay) {
    day.classList.add('locked'); // Clase para días bloqueados
    day.textContent = '🔒';
  } else {
    // Evento al hacer clic en días desbloqueados
    day.addEventListener('click', () => {
      day.classList.add('opened');
      alert(`Abriendo el regalo del día ${i}`);
    });
  }

  calendar.appendChild(day);
}

// === CARGAR DATOS DESDE GOOGLE SHEETS ===
async function loadData() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) {
      throw new Error('No se pudo cargar la hoja de cálculo. Verifica el enlace.');
    }

    const data = await response.text();
    const rows = data.split('\n');
    rows.shift(); // Ignorar encabezados (opcional, si existen)

    rows.forEach(row => {
      const [day, image, gift] = row.split(','); // Extraer columnas: día, imagen, regalo

      const dayDiv = document.querySelector(`.day:nth-child(${day})`);
      if (dayDiv) {
        // Añadir funcionalidad al clic
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
    console.error('Error al cargar los datos:', error.message);
    alert('Hubo un problema al cargar los datos desde la hoja de cálculo.');
  }
}

// Cargar los datos al iniciar la página
loadData();
