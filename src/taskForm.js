import { pubsub } from "./pubsub.js"
import { CreateTask, addTask } from "./taskModal.js"

export function taskForm(project) {
    let taskformtemplate = document.querySelector("#taskformtemplate")
    let div = taskformtemplate.content.cloneNode(true)
    let wrapper = document.querySelector(".wrapper")
    wrapper.appendChild(div)
    let taskformbox = document.querySelector("dialog")
    taskformbox.showModal()
    let form = document.querySelector("#form")
    let submit = document.querySelector("#submit-task")

    //Event listener for submit buttton
    
    submit.addEventListener("click", (e) => {
        e.preventDefault()
        let title = form.title.value
        let notes = form.notes.value
        let dueDate = form.dueDate.value
        let priority = form.priority.value
        let task = CreateTask(title, notes, dueDate, priority)
        addTask(project, task)
        taskformbox.remove()
    })

}