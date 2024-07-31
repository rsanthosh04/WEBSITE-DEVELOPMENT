function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('taskInput').value;

    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const tasks = getTasks();

    const task = {
        text: taskInput,
        completed: false
    };

    tasks.push(task);
    saveTasks(tasks);

    renderTasks();

    // Clear input field
    document.getElementById('taskInput').value = '';
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function toggleCompleteTask(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task');
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskInfo.appendChild(taskText);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');

        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleCompleteTask(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);

        buttonsContainer.appendChild(completeBtn);
        buttonsContainer.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(buttonsContainer);

        taskList.appendChild(li);
    });
}

// Initial rendering of tasks
document.addEventListener('DOMContentLoaded', () => renderTasks());
