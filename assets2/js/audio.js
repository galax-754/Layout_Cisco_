// Funcionalidad del reproductor de audio
function initAudioPlayer() {
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseButton = document.getElementById('playPause');
  const nextButton = document.getElementById('next');
  
  // Lista de reproducción de ejemplo 
  const playlist = [
    {
      title: 'DTmF',
      artist: 'Bad Bunny',
      src: 'assets2/audio/Bad Bunny - DtMF (Letra).mp3' 
    },
    {
      title: 'Me voy',
      artist: 'Julieta Venegas',
      src: 'assets2/audio/Julieta Venegas  Me Voy [Letra].mp3' 
    }
  ];
  
  let currentTrackIndex = 0;
  let isPlaying = false;
  
  // Función para cargar una pista
  function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    
    // Actualizar interfaz con clases BEM
    const titleElement = document.querySelector('.player__track-title');
    const artistElement = document.querySelector('.player__track-artist');
    
    if (titleElement) titleElement.textContent = track.title;
    if (artistElement) artistElement.textContent = track.artist;
    
    // Cargar el archivo de audio
    audioPlayer.src = track.src;
    audioPlayer.load();
  }
  
  // Actualizar interfaz del botón reproducir/pausar
  function updatePlayPauseButton() {
    const playIconText = isPlaying ? '⏸' : '▶️';
    if (playPauseButton) {
      playPauseButton.innerHTML = `<span style="font-size: 18px;">${playIconText}</span>`;
    }
    
    // Actualizar animación del indicador
    const statusIndicator = document.querySelector('.player__status-indicator');
    if (statusIndicator) {
      if (isPlaying) {
        statusIndicator.style.animation = 'pulse 2s infinite';
      } else {
        statusIndicator.style.animation = 'none';
      }
    }
  }
  
  // Evento de clic del botón reproducir/pausar
  if (playPauseButton) {
    playPauseButton.addEventListener('click', () => {
      if (audioPlayer.readyState === 0) {
        loadTrack(currentTrackIndex);
      }
      
      if (isPlaying) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
      
      isPlaying = !isPlaying;
      updatePlayPauseButton();
    });
  }
  
  // Evento de clic del botón siguiente
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      
      if (isPlaying) {
        audioPlayer.play();
      }
    });
  }
  
  // Eventos del reproductor de audio
  audioPlayer.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      audioPlayer.play();
    }
  });
  
  // Inicializar con la primera pista
  loadTrack(currentTrackIndex);
  updatePlayPauseButton();
}