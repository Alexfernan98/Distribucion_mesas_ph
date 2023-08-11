// Variable para almacenar el elemento que esta siendo arrastrado
let draggedItem = null;

function drag(event) {
    // Almacena el contenido de la caja en el objeto DataTransfer para poder arrastrarlo
    event.dataTransfer.setData("text/plain", event.target.textContent);
    draggedItem = event.target;
}

// Esta funcion se activa cuando arrastramos el elemento sobre un objetivo valido
// Para que el navegador nos permita soltar el elemento debemos llamar a la funcion preventDefaul()
function allowDrop(event) {
    event.preventDefault();
}
// Se activa cuando soltamos el elemento sobre un objetivo valido 
// Usamos prevent default para evitar que el navegador abra el elemento en una pestaña nueva en caso de que sea posible
function drop(event) {
    event.preventDefault();
    // Almacenamos el contenido dentro de la variable data el metodo getData pide un argumento que sera en que formato queremos pasar la informacion y con event target estableceremos el contenido en la caja nueva completando el proceso de arrastrar y soltar. 
    const data = event.dataTransfer.getData("text/plain");
    // Se obtienen todos los elementos que tengan la clase drag-item
    const dragItems = event.target.querySelectorAll('.drag-item');
    // Creamos la variable found, que utilizaremos para saber si el contenido ya existe donde queremos arrastrarlo.
    let found = false;

    // Usamos un bucle forEach para recorrer los elementos encontrados en drag-items
    dragItems.forEach(item => {
        // Si el elemento que arrastramos ya existe en la mesa, decimos que found es true para que no pueda ser dropeado
        if (item.textContent === data) {
        found = true;
        }
    });
    // si el contenido no se encuentra en la caja arrastrada se ejeecutara lo siguiente...
    if (!found){
        const newItem = draggedItem.cloneNode(true); // Clonar el elemento
        newItem.removeAttribute("draggable"); // Remover el atributo "draggable" del clon para evitar conflictos
        newItem.addEventListener('dragstart', drag); // Agregar evento 'dragstart' al clon
        newItem.setAttribute("draggable", "true"); // Volver a hacer el clon arrastrable
        event.target.appendChild(newItem); // Agregar el clon al nuevo contenedor
    }

    // Si el elemento no está en la misma mesa de origen, lo eliminamos del contenedor anterior
    if (draggedItem.parentElement !== event.target) {
    draggedItem.parentElement.removeChild(draggedItem);
    }
}

// Agregamos eventos de arrastrar y soltar a todas las cajas con la clase "mesa"
const mesas = document.querySelectorAll('.mesa');

mesas.forEach(mesa => {
mesa.addEventListener('dragover', allowDrop);
mesa.addEventListener('drop', drop);
});