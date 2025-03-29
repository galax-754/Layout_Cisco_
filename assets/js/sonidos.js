document.addEventListener("DOMContentLoaded", () => {
    const teclas = document.querySelectorAll(".inicio__tecla"); //sELECCIONO todas las clases de mis teclas
    const audio = new Audio("assets/sounds/sonido__tecla.mp3"); // Usa el mismo sonido para todas

    teclas.forEach(tecla => { //Para recorrer entre mis clases de teclas
        tecla.addEventListener("click", () => { 
            audio.currentTime = 0; // Reinicia el audio si ya está sonando
            audio.play();
        });
    });
});
