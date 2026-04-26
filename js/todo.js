const form = document.getElementById('form-tarea');
const input = document.getElementById('input-tarea');
const lista = document.getElementById('lista-tareas');
const contador = document.getElementById('contador');

// (d) Función para actualizar contador de pendientes
const actualizarContador = () => {
    const pendientes = document.querySelectorAll('li:not(.completada)').length;
    contador.textContent = `Tareas pendientes: ${pendientes}`;
};

// (a) Agregar tareas con preventDefault + createElement
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página
    
    const textoTarea = input.value.trim();
    
    // No se puede agregar una tarea vacía
    if (textoTarea === '') {
        alert('No podés agregar una tarea vacía');
        return;
    }

    // Crear <li> con createElement
    const li = document.createElement('li');
    
    // Span con el texto de la tarea
    const spanTexto = document.createElement('span');
    spanTexto.textContent = textoTarea;
    spanTexto.classList.add('texto-tarea');
    
    // (b) Click para marcar como completada con classList.toggle
    spanTexto.addEventListener('click', () => {
        li.classList.toggle('completada');
        actualizarContador(); // Actualiza contador al tachar/destachar
    });
    
    // (c) Botón para eliminar con .remove()
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.addEventListener('click', () => {
        li.remove(); // Elimina el <li> del DOM
        actualizarContador(); // Actualiza contador al borrar
    });
    
    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    
    input.value = ''; // Limpia el input
    actualizarContador(); // Actualiza contador al agregar
});

// Inicializar contador
actualizarContador();