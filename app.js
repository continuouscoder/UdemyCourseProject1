// Define UI Variables
// Examine UI and define each variable we need to use:
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Call a function to Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task
    taskList.addEventListener('click', deleteTask);
    // Clear all Tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter through the tasks
    filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e){    // Param here is the 'event parameter'
    if(taskInput.value === ''){
        alert('Add a Task');
    }
    // Create li element:
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create delete link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append icon
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Clear Input
    taskInput.value = '';

    e.preventDefault(); // default is a form submit
}

// Delete Task
function deleteTask(e){     // Param here is the 'event parameter'
    // Focus click on the delte icon:
    if(e.target.parentElement.classList.contains('delete-item')){
        console.log(e.target.parentNode.parentElement)
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
    e.preventDefault();
}

// Clear all tasks
function clearTasks(e){   // Param here is the 'event parameter'
    // taskList.innerHTML = '';
    // Tests on innerHTML set to '' show that it is incredibly slow
    // compared to using a while loop:

    // A faster method is this:
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    e.preventDefault();
}

// Filter tasks
function filterTasks(e){    // Param here is the 'event parameter'
    const text = e.target.value;
    document.querySelectorAll('.collection-item').forEach(
        function(task){     // iterating over each node element as "task"
            const item = task.firstChild.textContent;   // returns all tasks as text (for each loops through and catches each first child / elemnt) 
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    )
}