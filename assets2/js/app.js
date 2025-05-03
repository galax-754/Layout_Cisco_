// Contenido del archivo js/app.js
// Inicialización principal de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('Aplicación de Fitness inicializada');
  
    // Inicializar componentes
    initCards();
    initAudioPlayer();
    
    // Crear iconos SVG de respaldo si no están disponibles
    createMockIcons();
  });
  
  // Crear iconos SVG de respaldo para demostración
  function createMockIcons() {
    // Definir rutas para verificar imágenes
    const imagePaths = [
      'images/fitness-logo.svg',
      'images/play-icon.svg',
      'images/next-icon.svg',
      'images/home-icon.svg',
      'images/search-icon.svg',
      'images/calendar-icon.svg',
      'images/profile-icon.svg'
    ];
  
    // Para cada imagen, crear un elemento de respaldo si el archivo no existe
    imagePaths.forEach(path => {
      const imgElements = document.querySelectorAll(`img[src="${path}"]`);
      imgElements.forEach(img => {
        img.onerror = () => {
          const iconName = path.split('/').pop().split('-')[0];
          if (iconName === 'next') {
            createNextIcon(img);
          } else {
            createFallbackIcon(img, iconName);
          }
        };
      });
    });
  }
  
  // Crear un texto básico de respaldo para iconos faltantes
  function createFallbackIcon(imgElement, iconName) {
    const span = document.createElement('span');
    span.textContent = iconName.charAt(0).toUpperCase();
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.style.justifyContent = 'center';
    span.style.width = '24px';
    span.style.height = '24px';
    span.style.backgroundColor = 'rgba(255,255,255,0.2)';
    span.style.borderRadius = '50%';
    span.style.fontSize = '12px';
    span.style.fontWeight = 'bold';
    
    imgElement.parentNode.replaceChild(span, imgElement);
  }
  
  // Crear un icono específico para el botón siguiente
  function createNextIcon(imgElement) {
    const span = document.createElement('span');
    span.textContent = '⏭️';
    span.style.display = 'inline-flex';
    span.style.alignItems = 'center';
    span.style.justifyContent = 'center';
    span.style.width = '24px';
    span.style.height = '24px';
    span.style.fontSize = '18px';
    
    imgElement.parentNode.replaceChild(span, imgElement);
  }