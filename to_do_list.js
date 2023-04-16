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

    function createTaskElement(taskText) {
        const newTask = document.createElement('div');
        newTask.className = "tasks"

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.addEventListener('change', fadeTask);
        newTask.appendChild(checkbox);

        const taskLabel = document.createElement('p');
        taskLabel.innerHTML = taskText;
        taskLabel.className = 'task-label slide-in no-select';
        taskLabel.addEventListener('dblclick', revealDeleteButton);
        newTask.appendChild(taskLabel);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-task hidden no-select';
        deleteButton.addEventListener('click', deleteTask);
        newTask.appendChild(deleteButton);

        return newTask;
    }

    function deleteTask(event) {
        const task = event.target.parentElement;
        const taskText = task.querySelector('.task-label').innerHTML;
        task.classList.add('slide-out');
        setTimeout(() => {
            taskList.removeChild(task);
            // Remove the task from localStorage
            removeTaskFromStorage(taskText);
        }, 500);
    }

    function fadeTask(event) {
        const task = event.target.parentElement;
        const taskText = task.querySelector('.task-label').innerHTML;
        if (event.target.checked) {
            task.classList.add('fade-out');
            setTimeout(() => {
                taskList.removeChild(task);
                // Remove the task from localStorage
                removeTaskFromStorage(taskText);
            }, 1000);
        }
    }

    function revealDeleteButton(event) {
        const task = event.target.parentElement;
        const deleteButton = task.querySelector('.delete-task');
        deleteButton.classList.toggle('hidden');
    }

    function saveTaskToStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromStorage() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(taskText => {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
        });
    }

    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
