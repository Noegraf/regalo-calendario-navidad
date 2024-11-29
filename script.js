// Datos de ejemplo para los días del calendario de Adviento
const calendarData = [
  { day: 1, image: 'https://via.placeholder.com/150', gift: 'Una cita especial' },
  { day: 2, image: 'https://via.placeholder.com/150', gift: 'https://spotify.com/...' },
  { day: 3, image: '', gift: '' },
  { day: 4, image: '', gift: '' },
  { day: 5, image: '', gift: '' },
  // Agrega los días restantes con datos similares
  { day: 6, image: '', gift: '' },
  { day: 7, image: '', gift: '' },
  { day: 8, image: '', gift: '' },
  { day: 9, image: '', gift: '' },
  { day: 10, image: '', gift: '' },
  { day: 11, image: '', gift: '' },
  { day: 12, image: '', gift: '' },
  { day: 13, image: '', gift: '' },
  { day: 14, image: '', gift: '' },
  { day: 15, image: '', gift: '' },
  { day: 16, image: '', gift: '' },
  { day: 17, image: '', gift: '' },
  { day: 18, image: '', gift: '' },
  { day: 19, image: '', gift: '' },
  { day: 20, image: '', gift: '' },
  { day: 21, image: '', gift: '' },
  { day: 22, image: '', gift: '' },
  { day: 23, image: '', gift: '' },
  { day: 24, image: '', gift: '' }
];

// Obtener el contenedor del calendario
const calendar = document.getElementById('calendar');
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // Meses en JavaScript van de 0 a 11

// Asegurarse de que sea diciembre
//if (currentMonth !== 12) {
 // alert('Este calendario solo funciona en diciembre.');
//} else {
  // Generar los días del calendario
  calendarData.forEach(data => {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.textContent = data.day;

    // Bloquear días futuros
    if (data.day > currentDay) {
      dayDiv.classList.add('locked');
      dayDiv.textContent = '🔒';
    } else {
      // Evento al hacer clic en días desbloqueados
      dayDiv.addEventListener('click', () => {
        if (data.day <= currentDay) {
          dayDiv.classList.add('opened');

          // Mostrar un mensaje con la información del regalo
          if (data.image && data.gift) {
            const giftWindow = window.open('', '_blank');
            giftWindow.document.write(`
              <h1>Regalo del Día ${data.day}</h1>
              <img src="${data.image.trim()}" alt="Regalo" style="width: 300px;">
              <p>${data.gift.trim()}</p>
            `);
          } else {
            alert('No hay datos disponibles para este día.');
          }
        }
      });
    }

    calendar.appendChild(dayDiv);
  });
//}
