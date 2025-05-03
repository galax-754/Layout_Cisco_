// Contenido del archivo js/cards.js
function initCards() {
    const cards = document.querySelectorAll('.activity-card');
  
    cards.forEach(card => {
      const preview = card.querySelector('.activity-card__preview');
      let isTransitioning = false;
      
      preview.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const isExpanded = card.classList.toggle('activity-card--expanded');
        
        // Ocultar otras tarjetas cuando una está expandida
        cards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.style.display = isExpanded ? 'none' : '';
          }
        });
  
        if (isExpanded) {
          card.style.gridColumn = '1 / -1';
          setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const cardTop = cardRect.top + scrollTop;
            
            window.scrollTo({
              top: cardTop - 100,
              behavior: 'smooth'
            });
            isTransitioning = false;
          }, 300);
        } else {
          card.style.gridColumn = '';
          setTimeout(() => {
            cards.forEach(otherCard => {
              otherCard.style.display = '';
            });
            isTransitioning = false;
          }, 300);
        }
      });
      
      const actionButtons = card.querySelectorAll('.activity-card__actions button');
      actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const actionType = button.textContent.trim();
          console.log(`Acción seleccionada: ${actionType} para ${card.querySelector('.activity-card__title').textContent}`);
          
          showToast(`${actionType} iniciado!`);
        });
      });
    });
  }
  
  function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
      existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '24px',
      zIndex: '1000',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    toast.style.animation = 'toastIn 0.3s ease-out forwards, toastOut 0.3s ease-in forwards 2.7s';
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastIn {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
      @keyframes toastOut {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  }