const apiUrl = 'http://localhost:5000'; // Base URL for the API

// Generic GET request
async function getData(endpoint, token = '') {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Generic POST request
async function postData(endpoint, data, token = '') {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Generic DELETE request
async function deleteData(endpoint, token = '') {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Generic PUT request
async function updateData(endpoint, data, token = '') {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error.message);
        alert(`Error: ${error.message}`);
    }
}

// Edit task function
// async function editTask(taskId) {
//     const task = await getData(`/tasks/${taskId}`, token); // Fetch the task data from the server

//     if (!task) {
//         console.error('Task not found');
//         return;
//     }

//     // Fill the form fields in the modal with the task's current data
//     document.getElementById('task-title').value = task.title;
//     document.getElementById('task-description').value = task.description || '';
//     document.getElementById('task-priority').value = task.priority;
//     document.getElementById('task-deadline').value = task.deadline || '';
//     document.getElementById('task-id').value = taskId; // Set taskId in the hidden field

//     //document.getElementById('task-deadline').value = task.deadline ? formatDateForInput(task.deadline) : '';
//     console.log(task.deadline);

//     // Change the form's submit button to "Save Changes" instead of "Add Task"
//     const submitButton = document.querySelector('#add-task-form button[type="submit"]');
//     submitButton.textContent = 'Save Changes';

//     // Open the modal
//     const modal = document.getElementById('add-task-modal');
//     modal.style.display = 'block';

//     // Handle form submission to update the task
//     const addTaskForm = document.getElementById('add-task-form');
//     addTaskForm.onsubmit = async (e) => {
//         e.preventDefault();

//         const title = document.getElementById('task-title').value;
//         const description = document.getElementById('task-description').value;
//         const priority = document.getElementById('task-priority').value;
//         const deadline = document.getElementById('task-deadline').value; 

//         const updatedTask = { title, description, priority, deadline };

//         // Use the updateData function to update the task on the server
//         await updateData(`/tasks/${taskId}`, updatedTask, token);  // PUT request to update the task
//         modal.style.display = 'none';  // Close the modal after saving
//         fetchTasks();  // Reload the tasks
//     };
// }
