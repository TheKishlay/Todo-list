import { pubsub } from "./pubsub.js"
import { CreateTask, addTask, validateDate } from "./taskModal.js"

export function taskForm(projects, projectPointer) {
    let taskformtemplate = document.querySelector("#taskformtemplate")
    let div = taskformtemplate.content.cloneNode(true)
    let wrapper = document.querySelector(".wrapper")
    wrapper.appendChild(div)
    let taskformbox = document.querySelector("dialog")
    taskformbox.showModal()
    let form = document.querySelector("#form")
    let submit = document.querySelector("#submit-task")

    console.log(projects)

    //Event listener for submit buttton

    submit.addEventListener("click", (e) => {
        if (!validateDate(form.dueDate.value)) {
            alert("Enter valid date!")
            e.preventDefault()
        }
        else {
            e.preventDefault()
            let title = form.title.value
            let notes = form.notes.value
            let dueDate = new Date(form.dueDate.value).toDateString()
            let priority = form.priority.value
            let task = CreateTask(title, notes, dueDate, priority)
            addTask(projects, projectPointer, task)
            taskformbox.remove()
        }
    })

}