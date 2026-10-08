// 1. Seleccionar los elementos de la página por su id
const botonAbrir = document.getElementById('chat-abrir');
const bocadillo = document.getElementById('chat-bocadillo');
const ventana = document.getElementById('chat-ventana');
const fondoChat = document.getElementById('chat-fondo');
const botonCerrar = document.getElementById('chat-cerrar');
const mensajes = document.getElementById('chat-mensajes');
const formulario = document.getElementById('chat-formulario');
const entrada = document.getElementById('chat-entrada');
const botonEnviar = formulario.querySelector('button');
const opciones = document.querySelectorAll('.chat-opcion');
let elementoQueAbrio = null;
//const limpio = data.respuesta.replaceAll("**","");
// 2. Abrir y cerrar la ventana del chat
// Abrir: se muestra la ventana y se esconde el bocadillo
function abrirChat() {
  elementoQueAbrio = document.activeElement;
  ventana.hidden = false;
  fondoChat.hidden = false;
  document.querySelector('.chat-lanzador').inert = true;
  bocadillo.hidden = true;
  botonCerrar.focus();
}

// Cerrar: se oculta la ventana y vuelve a salir el bocadillo
function cerrarChat() {
  ventana.hidden = true;
  fondoChat.hidden = true;
  document.querySelector('.chat-lanzador').inert = false;
  bocadillo.hidden = false;
  elementoQueAbrio?.focus();
}

// El chat solo se cierra con la X
botonAbrir.addEventListener('click', () => {
  if (ventana.hidden) {
    abrirChat();
  }
});

// Bocadillo: abre la ventana
bocadillo.addEventListener('click', abrirChat);

// X de la cabecera: cierra la ventana
botonCerrar.addEventListener('click', cerrarChat);

ventana.addEventListener('keydown', (evento) => {
  if (evento.key !== 'Tab') return;

  const elementosEnfocables = Array.from(
    ventana.querySelectorAll('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])')
  ).filter((elemento) => !elemento.disabled && elemento.getClientRects().length > 0);
  const primero = elementosEnfocables[0];
  const ultimo = elementosEnfocables[elementosEnfocables.length - 1];

  if (evento.shiftKey && document.activeElement === primero) {
    evento.preventDefault();
    ultimo.focus();
  } else if (!evento.shiftKey && document.activeElement === ultimo) {
    evento.preventDefault();
    primero.focus();
  }
});

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

  if (quien === 'asistente') {
    const contenedor = document.createElement('div');
    contenedor.classList.add('contenedor-mensaje');

    const logo = document.createElement('img');
    logo.src = 'assets/circulos.png';
    logo.alt = '';
    logo.setAttribute('aria-hidden', 'true');
    logo.classList.add('chat-logo');

    contenedor.append(logo, mensaje);
    mensajes.appendChild(contenedor);
  } else {
    mensajes.appendChild(mensaje);
  }

  // Bajar el scroll hasta el último mensaje
  mensajes.scrollTop = mensajes.scrollHeight;
  return mensaje;
}

// 4. Enviar el mensaje a /api/chat y pintar la respuesta
const MENSAJE_ERROR = 'Ahora mismo no te puedo responder. Inténtalo de nuevo en unos minutos, llámanos al 945 03 99 81 o mándanos un WhatsApp al 688 85 16 41';

async function enviarMensaje(texto) {
  texto = texto.trim();
  if (texto === '') return;

  agregarMensaje(texto, 'usuario');
  botonEnviar.disabled = true;

  // Burbuja provisional que luego se rellena con la respuesta
  const burbuja = agregarMensaje('Escribiendo...', 'asistente');
  burbuja.classList.add('escribiendo');
  const parrafo = burbuja.querySelector('p');
  parrafo.textContent = 'Escribiendo ';
  parrafo.setAttribute('aria-label', 'Escribiendo ');
  for (let i = 0; i < 3; i += 1) {
    const punto = document.createElement('span');
    punto.classList.add('punto-escribiendo');
    punto.setAttribute('aria-hidden', 'true');
    parrafo.appendChild(punto);
  }

  function mostrarRespuesta(texto) {
    burbuja.classList.remove('escribiendo');
    parrafo.removeAttribute('aria-label');
    parrafo.textContent = texto;
  }

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
    mostrarRespuesta(datos.respuesta);
  } catch (error) {
    mostrarRespuesta(MENSAJE_ERROR);
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
