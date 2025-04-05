const inputIngrediente = document.querySelector('.formulario__input');
const botonAgregar = document.querySelector('.boton__agregar');
const botonCompletar = document.querySelector('.boton__completar');
const mensaje = document.querySelector('.formulario__mensaje');
const seccionResultado = document.querySelector('.pedido__resultado');
const resultadoTexto = document.querySelector('.hamburguesa__ingredientes');

let ingredientes = [];

// Función que devuelve una promesa
function prepararHamburguesa(ingredientes) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (ingredientes.includes("pulpo") || ingredientes.includes("cebolla")) {
                reject("❌ No tenemos ese ingrediente en este momento.");
            } else {
                resolve(`🍔 Tu hamburguesa con ${ingredientes.join(', ')} está lista`);
            }
        }, 2000);
    });
}

// Agregar ingredientes
botonAgregar.addEventListener('click', () => {
    const valor = inputIngrediente.value.trim();

    if (valor === '') {
        mensaje.textContent = "⚠️ Escribe un ingrediente.";
        mensaje.style.color = "red";
        return;
    }

    ingredientes.push(valor);
    mensaje.textContent = `✅ Agregado con éxito: ${valor}`;
    mensaje.style.color = "green";
    inputIngrediente.value = '';
});

// Completar pedido con promesa
botonCompletar.addEventListener('click', () => {
    if (ingredientes.length === 0) {
        mensaje.textContent = "⚠️ Agrega al menos un ingrediente.";
        mensaje.style.color = "red";
        return;
    }

    mensaje.textContent = "⏳ Preparando tu hamburguesa...";
    mensaje.style.color = "#444";

    prepararHamburguesa(ingredientes)
        .then((resultado) => {
            mensaje.textContent = "✅ Pedido completado.";
            mensaje.style.color = "green";
            resultadoTexto.textContent = resultado;
            seccionResultado.style.display = 'block';
        })
        .catch((error) => {
            mensaje.textContent = error;
            mensaje.style.color = "red";
            seccionResultado.style.display = 'none';
        });
});
