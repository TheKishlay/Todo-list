import { pubsub } from "./pubsub"
import { saveProjects } from "./storage"
import { taskForm } from "./taskForm";

export function CreateTask(title, notes, dueDate, priority) {
    return { title, notes, dueDate, priority }
}

export function deleteTask(projects, projectPointer, task) {
    console.log(projects[projectPointer])
    const index = projects[projectPointer][Object.keys(projects[projectPointer])[0]].findIndex(todo => JSON.stringify(todo) === JSON.stringify(task));
    if (index !== -1) {
        projects[projectPointer][Object.keys(projects[projectPointer])[0]].splice(index, 1);
    }
    saveProjects(projects)
}

export function addTask(projects, projectPointer, task) {
    projects[projectPointer][Object.keys(projects[projectPointer])[0]].push(task)
    pubsub.publish("taskadded", [projects, projectPointer])
    saveProjects(projects)
    console.log(projects)
}

export function editTask(element, projects, projectPointer, task) {
    //selecting elements
    let taskDiv = element.closest("li")
    const taskTitle = taskDiv.querySelector(".task-title");
    const taskNotes = taskDiv.querySelector(".task-notes");
    const taskDueDate = taskDiv.querySelector(".task-due-date");
    const taskPriority = taskDiv.querySelector(".task-priority");
    const taskDeleteBtn = taskDiv.querySelector(".deleteTask")
    const taskEditBtn = taskDiv.querySelector(".editTask")

    taskDeleteBtn.style.display = "none"
    taskEditBtn.style.display = "none"

    //task index in projects
    const taskIndex = projects[projectPointer][Object.keys(projects[projectPointer])[0]].findIndex(todo => JSON.stringify(todo) === JSON.stringify(task));

    let taskPointer = projects[projectPointer][Object.keys(projects[projectPointer])[0]][taskIndex]

    console.log("task pointer", taskPointer)

    taskTitle.contentEditable = true
    taskTitle.focus()

    taskNotes.contentEditable = true

    let dueDateinput = document.createElement("input")
    dueDateinput.setAttribute("type", "date")
    dueDateinput.classList.add("task-due-date")
    taskDueDate.appendChild(dueDateinput)

    let taskPriorityinput = document.createElement("input")
    taskPriorityinput.setAttribute("type", "range")
    taskPriorityinput.min = 1;
    taskPriorityinput.max = 5;
    taskPriorityinput.classList.add("task-priority")
    taskPriority.appendChild(taskPriorityinput)

    // taskPointer.title = taskTitle.textContent
    // taskPointer.notes = taskNotes.textContent
    // taskPointer.dueDate = dueDateinput.value
    // taskPointer.priority = taskPriorityinput.value

    //create a save button
    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save"
    saveBtn.classList.add("save-edit")
    taskDiv.appendChild(saveBtn)

    saveBtn.addEventListener("click", (e) => {

        if (!validateDate(dueDateinput.value)) {
            alert("Enter valid date!")
        }
        else{
            taskPointer.title = taskTitle.textContent
            taskPointer.notes = taskNotes.textContent
            taskPointer.dueDate = new Date(dueDateinput.value).toDateString()
            taskPointer.priority = taskPriorityinput.value


            taskTitle.contentEditable = false
            taskNotes.contentEditable = false

            taskDueDate.removeChild(dueDateinput)
            taskPriority.removeChild(taskPriorityinput)

            taskEditBtn.textContent = "Edit"
            taskDeleteBtn.textContent = "X"

            //updating the task
            projects[projectPointer][Object.keys(projects[projectPointer])[0]][taskIndex] = taskPointer
            saveProjects(projects)
            pubsub.publish("taskadded", [projects, projectPointer])
        }
    })

    // create a cancel button to cancel the edit
    const cancelBtn = document.createElement("button")
    cancelBtn.textContent = "Cancel"
    cancelBtn.classList.add("cancel-edit")
    taskDiv.appendChild(cancelBtn)

    cancelBtn.addEventListener("click", () => {
        taskTitle.contentEditable = false
        taskNotes.contentEditable = false

        taskDueDate.removeChild(dueDateinput)
        taskPriority.removeChild(taskPriorityinput)

        taskEditBtn.textContent = "Edit"
        taskDeleteBtn.style.display = "block"

        //updating the task
        saveProjects(projects)
        pubsub.publish("taskadded", [projects, projectPointer])
    })

}

export function validateDate(date){
    const curDate = new Date()
    const dateInput = new Date(date)
    return dateInput > curDate
}