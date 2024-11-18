// Check for token
const token = localStorage.getItem('token');
console.log(token);
if (!token) {
    window.location.href = 'index.html';
}

// Fetch tasks
async function fetchTasks() {
    const tasks = await getData('/tasks', token);
    renderTasks(tasks);
}

// Render tasks as table rows
function renderTasks(tasks) {
    const tasksBody = document.getElementById('tasks-tbody');
    tasksBody.innerHTML = '';

    if (!Array.isArray(tasks)) {
        console.error('Tasks data is not an array:', tasks);
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement('tr');

        // Apply a class based on the priority
        const priorityClass = getPriorityClass(task.priority);

        row.classList.add(priorityClass); // Add priority class

        //Call the editTask and deleteTask function
        row.innerHTML = `
            <td data-label="Title">${task.title}</td>
            <td data-label="Description">${task.description || 'No description'}</td>
            <td data-label="Priority">${task.priority}</td>
            <td data-label="Deadline">${task.deadline || 'No deadline'}</td>
            <td data-label="Actions">
                <button onclick="editTask('${task._id}')">Edit</button>
                <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
            </td>
        `;

        tasksBody.appendChild(row);
    });
}

// Helper function to get the class for each priority
function getPriorityClass(priority) {
    if (priority === 'low') return 'low-priority';
    if (priority === 'medium') return 'medium-priority';
    return 'high-priority';
}

// Add task modal functionality
const modal = document.getElementById('add-task-modal');
const addTaskBtn = document.getElementById('add-task-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const addTaskForm = document.getElementById('add-task-form');

// Open modal
addTaskBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Handle form submission
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const deadline = document.getElementById('task-deadline').value ;

    const newTask = { title, description, priority, deadline };

    await postData('/tasks', newTask, token);
    modal.style.display = 'none';
    fetchTasks();
});

// Delete task
async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        await deleteData(`/tasks/${taskId}`, token);
        fetchTasks();
    }
}

// Filter tasks
document.getElementById('filter-btn').addEventListener('click', async () => {
    const priority = document.getElementById('filter-priority').value;
    const deadline = document.getElementById('filter-deadline').value;

    let url = '/tasks/filter?';
    if (priority) url += `priority=${priority}&`;
    if (deadline) url += `deadline=${deadline}`;

    const tasks = await getData(url, token);
    renderTasks(tasks);
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

// Load tasks on page load
fetchTasks();
