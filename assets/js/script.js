// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []; // added "|| []" condition, in case "tasks" does not exist in local storage
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskFormEl = $('#task-form');
const taskTitleInputEl = $('#task-title');
const taskDateInputEl = $('#task-due-date');
const taskDescriptionInputEl = $('task-description');
const taskDisplayEl = $('#task-display');

// Todo: create a function to generate a unique task id
function generateTaskId() {
    // will generate a string of letters and numbers with length equal to 8
    return Math.random().toString(36).substring(2, 10);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<div>').addClass('card-text').text(task.description);
    const cardDueDate = $('<div>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if(now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task in taskList) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }

    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable') ? $(e.target) : $(e.target).closest('.ui-draggable');

            return original.clone().css({width: original.outerWidth()});
        }
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskId = generateTaskId();
    const taskTitle = taskTitleInputEl.val().trim();
    const taskDate = taskDateInputEl.val();
    const taskDescription = taskDescriptionInputEl.val();

    const newTask = {
        id: taskId,
        title: taskTitle,
        dueDate: taskDate,
        description: taskDescription,
        status: 'to-do'
    };

    const tasks = taskList;
    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTaskList();

    taskTitleInputEl.val('');
    taskDateInputEl.val('');
    taskDescriptionInputEl.val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const taskId = event.target.setAttribute('data-task-id');
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const taskIdDrop = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;

    for (let task of tasks) {
        if (task.id === taskIdDrop) {
            task.status = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// When the "Add Task" button is clicked, a modal pops up with a form to input task content 
const formModal = document.getElementById('formModal');
if (formModal) {
    formModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget;
  });
}

taskFormEl.on('submit', handleAddTask);

taskDisplayEl.on('click', '.btn-delete-task', handleDeleteTask);

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('#task-due-date').datepicker({
        changeMonth: true,
        changeYear: true
    });

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop
    });
});
