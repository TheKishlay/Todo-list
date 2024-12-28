import { pubsub } from "./pubsub"
import { formsubmit } from "./formsubmit"

export const sidetab = { 
    taskList: [],   

    render: container => {
        let template = document.querySelector("#taskList")
        let div = template.content.cloneNode(true)
        container.appendChild(div)

        template = document.querySelector("#addTaskBtn")
        div = template.content.cloneNode(true)
        container.appendChild(div)
        let addbtn = document.querySelector("#addBtn")
        addbtn.addEventListener("click", formsubmit)

        pubsub.subscribe("taskadded", sidetab.addTask)
    },

    addTask: form => {
        sidetab.taskList.push(form.title.value)

        let ul = document.querySelector(".task-container ul")
        let li = document.createElement("li")
        li.innerHTML = form.title.value
        ul.appendChild(li)
    }
}