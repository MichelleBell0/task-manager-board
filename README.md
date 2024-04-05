# Task Manager Board
A simple application used for task management.

## Description
With this task management application you are able to add, move, and delete tasks to help users organize and prioritize tasks. Get started by clicking the "Add Task" button at the top of the page. The user will be presented with a modal form that will collect user input to create a task. User needs to enter the task's title, due date, and description. Once the user submits the form, the modal closes and the page will display a list of tasks including the recent addition. 

The task cards are colour coded: 
- red when the due date is past due
- yellow when the due date is the current day
- white when the due date is a future date

The colour coordination helps the user prioritize his tasks and stay on track. In addition, the task cards are draggable and droppable between the status lanes "To Do", "In Progress", and "Done". Once a task card is moved to the "Done" lane the card colour changes to white. If the user wishes to delete a task, the task card contains a delete button that will remove the task from the list and local storage. 

## Screenshot
![Task List Displayed Screenshot](task-list.png)
![Task Manager Modal Form Screenshot](modal-form.png)

## URL
https://michellebell0.github.io/task-manager-board/

## Reference
Referenced code from https://git.bootcampcontent.com/University-of-Toronto/UTOR-VIRT-FSF-PT-02-2024-U-LOLC.git in the script.js file and modified.