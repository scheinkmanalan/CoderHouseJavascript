// Definir un array para almacenar las tareas
const tasks = [];

// Función para agregar una nueva tarea
function addTask() {
  const taskInput = document.getElementById("taskInput");
  let descripTask = taskInput.value.trim();

  if(descripTask!= ''){
    const task ={
        text: descripTask,
        completed:false
    };
    tasks.push(task);
    
    //limpio la tarea agregada su textbox
    taskInput.value = "";
    
    // Actualizar la lista de tareas pendientes
    updatePendingTasks();
  }

}

// Función para eliminar una tarea
function deleteTask(index) {
    // Eliminar la tarea del array
    tasks.splice(index, 1);

    // Actualizar la lista de tareas pendientes
    updatePendingTasks();
}

// Función para marcar una tarea como completada
function completeTask(index) {
    // Cambiar el estado de la tarea a completada
    tasks[index].completed = true;

    // Actualizar la lista de tareas pendientes y completadas
    updatePendingTasks();
    updateCompletedTasks();
}

// Función para actualizar la lista de tareas pendientes en la página
function updatePendingTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    pendingTasksList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (!task.completed) {
            const listItem = document.createElement("li");
            listItem.textContent = task.text;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteTask(index);

            const completeButton = document.createElement("button");
            completeButton.textContent = "Completar";
            completeButton.onclick = () => completeTask(index);

            listItem.appendChild(deleteButton);
            listItem.appendChild(completeButton);

            pendingTasksList.appendChild(listItem);
        }
    });
}

// Función para actualizar la lista de tareas completadas en la página
function updateCompletedTasks() {
    const completedTasksList = document.getElementById("completedTasks");
    completedTasksList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (task.completed) {
            const listItem = document.createElement("li");
            listItem.textContent = task.text;

            completedTasksList.appendChild(listItem);
        }
    });
}

// Inicializar la lista de tareas al cargar la página
updatePendingTasks();
updateCompletedTasks();
