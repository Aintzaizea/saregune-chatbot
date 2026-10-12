const API_URL = '/api/conocimientos';

const contenedorConocimientos = document.querySelector('.lista-conocimientos');
const inputId = document.querySelector('#id');
const inputCategoria = document.querySelector('#categoria');
const inputTipo = document.querySelector('#tipo');
const inputNombre = document.querySelector('#nombre');
const inputPregunta = document.querySelector('#pregunta');
const inputDescripcion = document.querySelector('#descripcion');
const inputRespuesta = document.querySelector('#respuesta');
const inputInscripcion = document.querySelector('#inscripcion');
const inputUrl = document.querySelector('#url');

const contenedorMeses = document.querySelector('#contenedor-meses');
const btnAgregarMes = document.querySelector('#btn-agregar-mes');

const botonEnvio = document.querySelector('.boton-guardar');
const botonCancelar = document.querySelector('.boton-cancelar');
const formConocimiento = document.querySelector('.formulario');

let conocimientosCache = [];

function agregarFilaMes(nombreMes = '', horariosStr = '') {
    const div = document.createElement('div');
    div.className = 'fila-mes';
    div.innerHTML = `
        <input type="text" class="input-nombre-mes" placeholder="Nombre del mes (ej: enero, octubre)" value="${nombreMes}">
        <input type="text" class="input-horarios-mes" placeholder="Horarios separados por coma (ej: 09:00–10:15, 12:00)" value="${horariosStr}">
        <button type="button" class="boton-eliminar-mes" onclick="this.parentElement.remove()">X</button>
    `;
    contenedorMeses.appendChild(div);
}

btnAgregarMes.addEventListener('click', () => agregarFilaMes());

async function pintarConocimientos() {
    try {
        const response = await fetch(API_URL);
        const conocimientos = await response.json();

        conocimientosCache = conocimientos;
        contenedorConocimientos.innerHTML = "";

        conocimientos.forEach(elemento => {
            let horariosHtml = '-';
            if (elemento.horarios && typeof elemento.horarios === 'object') {
                const mesesEntries = Object.entries(elemento.horarios);
                if (mesesEntries.length > 0) {
                    horariosHtml = mesesEntries.map(([mes, horas]) => {
                        const horasTexto = Array.isArray(horas) ? horas.join(', ') : horas;
                        const mesFormateado = mes.charAt(0).toUpperCase() + mes.slice(1);
                        return `<strong>${mesFormateado}:</strong> ${horasTexto}`;
                    }).join(' | ');
                }
            }

            contenedorConocimientos.innerHTML += `
                <div class="tarjeta">
                    <p><strong>Categoría:</strong> ${elemento.categoria || '-'}</p>
                    <p><strong>Tipo:</strong> ${elemento.tipo || '-'}</p>
                    ${elemento.nombre ? `<p><strong>Nombre:</strong> ${elemento.nombre}</p>` : ''}
                    <p><strong>Pregunta:</strong> ${elemento.pregunta || '-'}</p>
                    <p><strong>Respuesta:</strong> ${elemento.respuesta || '-'}</p>
                    <p><strong>Horarios:</strong> ${horariosHtml}</p>
                    <p><strong>URL:</strong> ${elemento.url ? `<a href="${elemento.url}" target="_blank">${elemento.url}</a>` : '-'}</p>
                    <button data-id="${elemento._id}" class="accion-editar">Editar</button>
                    <button data-id="${elemento._id}" class="accion-eliminar">Eliminar</button>
                </div>
            `;
        });

        document.querySelectorAll('.accion-editar').forEach(boton => {
            boton.addEventListener('click', () => cargarDatosFormulario(boton.dataset.id));
        });

        document.querySelectorAll('.accion-eliminar').forEach(boton => {
            boton.addEventListener('click', () => eliminarConocimiento(boton.dataset.id));
        });

    } catch (error) {
        console.error('Error al cargar los conocimientos:', error);
    }
}

function cargarDatosFormulario(id) {
    const elemento = conocimientosCache.find(e => e._id === id);
    if (!elemento) return;

    inputId.value = elemento._id;
    inputCategoria.value = elemento.categoria || '';
    inputTipo.value = elemento.tipo || '';
    inputNombre.value = elemento.nombre || '';
    inputPregunta.value = elemento.pregunta || '';
    inputDescripcion.value = elemento.descripcion || '';
    inputRespuesta.value = elemento.respuesta || '';
    inputInscripcion.value = elemento.inscripcion || '';
    inputUrl.value = elemento.url || '';

    contenedorMeses.innerHTML = '';
    if (elemento.horarios && typeof elemento.horarios === 'object') {
        for (const [mes, horas] of Object.entries(elemento.horarios)) {
            const horasTexto = Array.isArray(horas) ? horas.join(', ') : horas;
            agregarFilaMes(mes, horasTexto);
        }
    }

    botonEnvio.textContent = "Actualizar Registro";
    botonCancelar.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limpiarFormulario() {
    formConocimiento.reset();
    inputId.value = '';
    contenedorMeses.innerHTML = '';
    botonEnvio.textContent = "Guardar / Añadir";
    botonCancelar.style.display = "none";
}

botonCancelar.addEventListener('click', limpiarFormulario);

formConocimiento.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = inputId.value;
    let horariosObj = undefined;
    const filasMeses = contenedorMeses.querySelectorAll('.fila-mes');
    
    if (filasMeses.length > 0) {
        horariosObj = {};
        filasMeses.forEach(fila => {
            const nombreMes = fila.querySelector('.input-nombre-mes').value.trim().toLowerCase();
            const textoHorarios = fila.querySelector('.input-horarios-mes').value.trim();
            if (nombreMes && textoHorarios) {
                horariosObj[nombreMes] = textoHorarios.split(',').map(s => s.trim());
            }
        });
    }

    const datos = {
        categoria: inputCategoria.value,
        tipo: inputTipo.value,
        nombre: inputNombre.value || undefined,
        pregunta: inputPregunta.value,
        descripcion: inputDescripcion.value || undefined,
        respuesta: inputRespuesta.value,
        inscripcion: inputInscripcion.value || undefined,
        url: inputUrl.value || undefined,
        horarios: horariosObj
    };

    const endpoint = id ? `${API_URL}/${id}` : API_URL;
    const metodo = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(endpoint, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            limpiarFormulario();
            await pintarConocimientos();
        } else {
            console.error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error al guardar:', error);
    }
});

async function eliminarConocimiento(id) {
    if (!confirm('¿Estás segura de que deseas eliminar este registro?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await pintarConocimientos();
        }
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
}

pintarConocimientos();