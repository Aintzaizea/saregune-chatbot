// ELEMENTOS DEL CHAT -------------------------------------------------------
// Se guardan las referencias al HTML que se usan durante toda la interacción.
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

// Estado local de la interfaz y de la conversación.
let elementoQueAbrio = null;
const historialConversacion = [];
let enviandoMensaje = false;

// APERTURA Y CIERRE --------------------------------------------------------
// Abre el diálogo, atenúa el fondo, bloquea el lanzador y mueve el foco a la X.
function abrirChat() {
  elementoQueAbrio = document.activeElement;
  ventana.hidden = false;
  fondoChat.hidden = false;
  document.querySelector('.chat-lanzador').inert = true;
  bocadillo.hidden = true;
  botonCerrar.focus();
}

// Cierra el diálogo, restablece la página y devuelve el foco al elemento original.
function cerrarChat() {
  ventana.hidden = true;
  fondoChat.hidden = true;
  document.querySelector('.chat-lanzador').inert = false;
  bocadillo.hidden = false;
  elementoQueAbrio?.focus();
}

// El botón flotante abre el diálogo; una vez abierto, solo la X lo cierra.
botonAbrir.addEventListener('click', () => {
  if (ventana.hidden) {
    abrirChat();
  }
});

// El bocadillo de bienvenida también sirve para abrir el chat.
bocadillo.addEventListener('click', abrirChat);

// La X es el único control que cierra el chat.
botonCerrar.addEventListener('click', cerrarChat);

// Mantiene la navegación por teclado dentro del diálogo modal.
ventana.addEventListener('keydown', (evento) => {
  if (evento.key !== 'Tab') return;

  // Se consideran solo los controles visibles y habilitados.
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

// CREACIÓN DE MENSAJES -----------------------------------------------------
// Crea una burbuja para el texto indicado y la añade a la zona desplazable.
// "quien" determina si el mensaje es del usuario o del asistente.
function agregarMensaje(texto, quien) {
  const mensaje = document.createElement('div');
  mensaje.classList.add('mensaje');

  // La clase "nuevo" activa la animación de entrada solo al crear el mensaje.
  mensaje.classList.add('nuevo');
  mensaje.addEventListener('animationend', () => mensaje.classList.remove('nuevo'), { once: true });

  // Los mensajes del usuario reciben estilos y alineación propios.
  if (quien === 'usuario') {
    mensaje.classList.add('usuario');
  }

  // textContent inserta texto plano, sin interpretar la respuesta como HTML.
  const parrafo = document.createElement('p');
  parrafo.textContent = texto;
  mensaje.appendChild(parrafo);

  // Las respuestas del asistente se agrupan con el logo que queda fuera de la burbuja.
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

  // Mantiene visible el mensaje que se acaba de añadir.
  mensajes.scrollTop = mensajes.scrollHeight;
  return mensaje;
}

// ENLACES EN LAS RESPUESTAS ------------------------------------------------
// Detecta teléfonos españoles de 9 cifras que empiezan por 6 o 9 (con o sin espacios).
const PATRON_TELEFONO = /\b[69]\d{2}[ .-]?\d{2}[ .-]?\d{2}[ .-]?\d{2}\b/g;

// Escribe un texto en un párrafo convirtiendo los teléfonos en enlaces:
// los móviles (6xx) abren WhatsApp en una ventana nueva y los fijos (9xx) llaman.
// Se construye con nodos (no con innerHTML) para que nada del texto se ejecute como HTML.
function escribirConEnlaces(elemento, texto) {
  texto = String(texto ?? '');
  elemento.textContent = ''; // vacía el párrafo
  let ultimo = 0;

  for (const coincidencia of texto.matchAll(PATRON_TELEFONO)) {
    const numero = coincidencia[0];
    const inicio = coincidencia.index;

    // Texto normal que hay antes del número (append lo añade como texto, no como HTML).
    elemento.append(texto.slice(ultimo, inicio));

    const digitos = numero.replace(/\D/g, ''); // solo las cifras
    const enlace = document.createElement('a');
    enlace.textContent = numero;

    if (digitos.startsWith('6')) {
      enlace.href = `https://wa.me/34${digitos}`;
      enlace.target = '_blank';
      enlace.rel = 'noopener noreferrer';
      enlace.setAttribute('aria-label', `Escribir por WhatsApp al ${numero}`);
    } else {
      enlace.href = `tel:+34${digitos}`;
    }

    elemento.append(enlace);
    ultimo = inicio + numero.length;
  }

  // Texto que queda después del último número.
  elemento.append(texto.slice(ultimo));
}

// ENVÍO A LA API ----------------------------------------------------------
// Texto que se muestra en la burbuja si la petición o la respuesta falla.
const MENSAJE_ERROR = 'Ahora mismo no te puedo responder. Inténtalo de nuevo en unos minutos, llámanos al 945 03 99 81 o mándanos un WhatsApp al 688 85 16 41.';

// Envía el texto a la API y actualiza la burbuja provisional con la respuesta.
async function enviarMensaje(texto) {
  texto = texto.trim();

  // Ignora entradas vacías y evita peticiones simultáneas para no desordenar el historial.
  if (texto === '' || enviandoMensaje) return;

  enviandoMensaje = true;
  agregarMensaje(texto, 'usuario');

  // Bloquea los controles de envío mientras la API procesa la consulta.
  botonEnviar.disabled = true;
  opciones.forEach((opcion) => {
    opcion.disabled = true;
  });

  // Muestra inmediatamente el indicador animado de espera.
  const burbuja = agregarMensaje('Escribiendo...', 'asistente');
  burbuja.classList.add('escribiendo');
  const parrafo = burbuja.querySelector('p');
  parrafo.textContent = 'Escribiendo ';
  parrafo.setAttribute('aria-label', 'Escribiendo ');

  // Los puntos son decorativos para lectores de pantalla: el texto accesible
  // se mantiene en la etiqueta del párrafo.
  for (let i = 0; i < 3; i += 1) {
    const punto = document.createElement('span');
    punto.classList.add('punto-escribiendo');
    punto.setAttribute('aria-hidden', 'true');
    parrafo.appendChild(punto);
  }

  // Sustituye el indicador por el texto final (con los teléfonos como enlaces)
  // y elimina el estado animado. El parámetro se llama "contenido" para no
  // confundirse con "texto", que es lo que escribió la persona.
  function mostrarRespuesta(contenido) {
    burbuja.classList.remove('escribiendo');
    parrafo.removeAttribute('aria-label');
    escribirConEnlaces(parrafo, contenido);
  }

  try {
    // Envía el turno nuevo y hasta seis mensajes previos como contexto.
    const respuesta = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mensajeUsuario: texto,
        historial: historialConversacion.slice(-6)
      })
    });

    if (!respuesta.ok) {
      throw new Error('Error del servidor');
    }

    // El backend responde con un objeto JSON que contiene "respuesta".
    const datos = await respuesta.json();
    mostrarRespuesta(datos.respuesta);

    // Conserva el turno correcto para que la siguiente petición tenga contexto.
    historialConversacion.push(
      { role: 'user', content: texto },
      { role: 'assistant', content: datos.respuesta }
    );

    // Mantiene como máximo seis mensajes (tres turnos) en el historial del navegador.
    if (historialConversacion.length > 6) {
      historialConversacion.splice(0, historialConversacion.length - 6);
    }
  } catch (error) {
    // Muestra un aviso comprensible si la llamada falla.
    mostrarRespuesta(MENSAJE_ERROR);
  } finally {
    // Reactiva los controles tanto si la petición tuvo éxito como si falló.
    enviandoMensaje = false;
    botonEnviar.disabled = false;
    opciones.forEach((opcion) => {
      opcion.disabled = false;
    });
    mensajes.scrollTop = mensajes.scrollHeight;
  }
}

// EVENTOS DE ENVÍO ---------------------------------------------------------
// Envía el contenido del campo sin recargar la página.
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (enviandoMensaje) return;

  const texto = entrada.value;
  entrada.value = '';
  enviarMensaje(texto);
  entrada.focus();
});

// Cada opción rápida envía a la IA la pregunta almacenada en su atributo data.
opciones.forEach((boton) => {
  boton.addEventListener('click', () => {
    enviarMensaje(boton.dataset.pregunta);
  });
});