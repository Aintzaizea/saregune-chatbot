// 1. Seleccionar los elementos de la página por su id
const botonAbrir = document.getElementById('chat-abrir');
const bocadillo = document.getElementById('chat-bocadillo');
const ventana = document.getElementById('chat-ventana');
const botonCerrar = document.getElementById('chat-cerrar');
const mensajes = document.getElementById('chat-mensajes');
const formulario = document.getElementById('chat-formulario');
const entrada = document.getElementById('chat-entrada');
const botonEnviar = formulario.querySelector('button');
const opciones = document.querySelectorAll('.chat-opcion');
// 2. Abrir y cerrar la ventana del chat
// Abrir: se muestra la ventana y se esconde el bocadillo
function abrirChat() {
  ventana.hidden = false;
  bocadillo.hidden = true;
}

// Cerrar: se oculta la ventana y vuelve a salir el bocadillo
function cerrarChat() {
  ventana.hidden = true;
  bocadillo.hidden = false;
}

// Botón grande: abre si la ventana está cerrada y cierra si está abierta
botonAbrir.addEventListener('click', () => {
  if (ventana.hidden) {
    abrirChat();
  } else {
    cerrarChat();
  }
});

// Bocadillo: abre la ventana
bocadillo.addEventListener('click', abrirChat);

// X de la cabecera: cierra la ventana
botonCerrar.addEventListener('click', cerrarChat);

// quien puede ser 'usuario' o 'asistente'. Devuelve la burbuja creada
function agregarMensaje(texto, quien) {
  const mensaje = document.createElement('div');
  mensaje.classList.add('mensaje');
  // Marca el mensaje como nuevo para que entre con animación; al terminar se quita
// la marca, así no se repite al volver a abrir el chat
  mensaje.classList.add('nuevo');
  mensaje.addEventListener('animationend', () => mensaje.classList.remove('nuevo'), { once: true });
  if (quien === 'usuario') {
    mensaje.classList.add('usuario');
  }

  const parrafo = document.createElement('p');
  parrafo.textContent = texto;

  mensaje.appendChild(parrafo);
  mensajes.appendChild(mensaje);

  // Bajar el scroll hasta el último mensaje
  mensajes.scrollTop = mensajes.scrollHeight;
  return mensaje;
}

// 4. Enviar el mensaje a /api/chat y pintar la respuesta
const MENSAJE_ERROR = 'Ahora mismo no te puedo responder. Inténtalo de nuevo en unos minutos o llámanos al 945 03 99 81.';

async function enviarMensaje(texto) {
  texto = texto.trim();
  if (texto === '') return;

  agregarMensaje(texto, 'usuario');
  botonEnviar.disabled = true;

  // Burbuja provisional que luego se rellena con la respuesta
  const burbuja = agregarMensaje('Escribiendo...', 'asistente');

  try {
    const respuesta = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensajeUsuario: texto })
    });

    if (!respuesta.ok) {
      throw new Error('Error del servidor');
    }

    const datos = await respuesta.json();
    burbuja.querySelector('p').textContent = datos.respuesta;
  } catch (error) {
    burbuja.querySelector('p').textContent = MENSAJE_ERROR;
  } finally {
    botonEnviar.disabled = false;
    mensajes.scrollTop = mensajes.scrollHeight;
  }
}

// 5. Eventos: enviar el formulario y pulsar una de las 4 opciones
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // evita que la página se recargue
  const texto = entrada.value;
  entrada.value = '';
  enviarMensaje(texto);
  entrada.focus();
});

// Las 4 opciones: al pulsar una, se envía su pregunta completa a la IA
opciones.forEach((boton) => {
  boton.addEventListener('click', () => {
    enviarMensaje(boton.dataset.pregunta);
  });
});

