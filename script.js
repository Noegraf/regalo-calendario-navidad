// Obtener el parámetro 'sheet' de la URL
const urlParams = new URLSearchParams(window.location.search);
const sheetURL = urlParams.get('sheet');

if (!sheetURL) {
  alert('No se encontró ningún enlace de Google Sheets. Por favor, genera tu calendario.');
} else {
  console.log('URL de la hoja:', sheetURL);

  // Función para procesar los datos CSV
  async function loadData() {
    try {
      const response = await fetch(sheetURL);
      if (!response.ok) {
        throw new Error('Error al cargar el archivo CSV.');
      }

      const csvText = await response.text();
      const rows = csvText.split('\n');
      const data = rows.map(row => row.split(','));

      // Procesar los datos para mostrar en la página
      for (let i = 1; i < data.length; i++) {
        const [day, image, gift] = data[i];
        if (day && day.trim() !== '') {
          console.log(`Día: ${day}, Imagen: ${image}, Regalo: ${gift}`);
          
          // Crear un elemento visual para cada día
          const dayDiv = document.createElement('div');
          dayDiv.className = 'day';
          dayDiv.textContent = `Día ${day}`;
          
          if (image) {
            const img = document.createElement('img');
            img.src = image;
            img.style.width = '150px';
            dayDiv.appendChild(img);
          }

          if (gift) {
            const p = document.createElement('p');
            p.textContent = gift;
            dayDiv.appendChild(p);
          }

          // Agregar el día al calendario
          document.body.appendChild(dayDiv);
        }
      }
    } catch (error) {
      console.error('Error al cargar y procesar los datos:', error);
      alert('Hubo un error al cargar los datos de la hoja de cálculo.');
    }
  }

  // Cargar y procesar los datos
  loadData();
}
