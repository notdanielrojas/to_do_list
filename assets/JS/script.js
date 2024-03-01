// Seleccionar elementos del DOM
const listaDeTareas = document.querySelector("#tareas"); // Selecciona el elemento con el id "tareas"
const tareaInput = document.querySelector("#nuevaTarea"); // Selecciona el elemento con el id "nuevaTarea"
const btnAgregar = document.querySelector("#agregarTarea"); // Selecciona el elemento con el id "agregarTarea"
const cuentaTareas = document.querySelector("#total"); // Selecciona el elemento con el id "total"
const cuentaRealizadas = document.querySelector("#realizadas"); // Selecciona el elemento con el id "realizadas"
const tareas = [
  /* Define un array de objetos que representan tareas, cada una con un id, una descripción y un estado de completado */
  { id: 1, tarea: "Lavar los cubiertos", completada: false },
  { id: 2, tarea: "Sacar la basura", completada: false },
  { id: 3, tarea: "Barrer el patio", completada: false },
];

// Función para renderizar la lista de tareas en el HTML
renderList(tareas);

// Event listener para el botón de agregar tarea
btnAgregar.addEventListener("click", () => {
  // Obtenemos el nombre de la tarea del input
  const nombreTarea = tareaInput.value;
  if (nombreTarea === "") {
    // Si el input está vacío, mostramos un mensaje de error
    alert("Debes escribir una tarea para poder asignarla.");
    return; // Salimos de la función para evitar agregar una tarea vacía
  }
  // Obtener el ID de la última tarea agregada
  let lastId = 0;
  if (tareas.length > 0) {
    lastId = tareas[tareas.length - 1].id;
  }
  // Creamos un objeto de tarea con el nombre y un ID único sumando 1 al ID de la última tarea
  const nuevaTarea = {
    id: lastId + 1,
    tarea: nombreTarea,
    completada: false, // Suponiendo que las nuevas tareas no están completadas inicialmente
  };
  // Agregamos la nueva tarea al array de tareas
  tareas.push(nuevaTarea);
  // Limpiamos el input de la tarea
  tareaInput.value = "";
  // Actualizamos el HTML
  renderList(tareas);
});

// Función para renderizar la lista de tareas en el HTML
function renderList(tareas) {
  let html = "";
  let tareasRealizadas = 0; // Variable para contar las tareas completadas
  for (const tarea of tareas) {
    // Genera el HTML para cada tarea y cuenta las tareas completadas
    html += `
      <tr id="tarea-${tarea.id}">
        <td class="id-container">${tarea.id}</td>
        <td>${tarea.tarea}</td>
        <td class="checkbox-container"><input type="checkbox" id="checkbox-${
          tarea.id
        }" ${tarea.completada ? "checked" : ""} onclick="marcarRealizada(${
      tarea.id
    })"></td>
        <td><button onclick="borrarTarea(${tarea.id})">Borrar</button></td>
      </tr>`;

    if (tarea.completada) {
      tareasRealizadas++;
    }
  }
  // Inserta el HTML generado en el elemento "listaDeTareas" y actualiza los contadores
  listaDeTareas.innerHTML = html;
  cuentaTareas.innerHTML = `${tareas.length}`;
  cuentaRealizadas.innerHTML = tareasRealizadas;
}

// Función para marcar una tarea como completada
function marcarRealizada(id) {
  // Encuentra la tarea con el ID dado
  const tarea = tareas.find((tareas) => tareas.id === id);
  // Cambia el estado de completada de la tarea
  tarea.completada = !tarea.completada;
  // Renderiza la lista de tareas actualizada
  renderList(tareas);
}

// Función para borrar una tarea
function borrarTarea(id) {
  // Encuentra el índice de la tarea con el ID dado y la elimina del array de tareas
  const index = tareas.findIndex((ele) => ele.id === id);
  tareas.splice(index, 1);
  // Renderiza la lista de tareas actualizada
  renderList(tareas);
}
