document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasksFromStorage();

    // Modify the form event listener
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const newTask = createTaskElement(taskText);

            taskList.appendChild(newTask);
            taskInput.value = '';

            // Save the task to localStorage
            saveTaskToStorage(taskText);
        }
    });

    taskList.addEventListener('change', (event) => {
        if (event.target.classList.contains('task-checkbox')) {
            fadeTask(event);
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            deleteTask(event);
        }
    });
}