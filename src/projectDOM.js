import { pubsub } from "./pubsub"
import { projectForm } from "./projectForm"
import { deleteProject } from "./projectModal" // rempved addProject from here
import { taskDOM } from "./taskDOM"

export const project = {
    //rendering the project DOM
    render: container => {
        let template = document.querySelector("#projectTemplate")
        let div = template.content.cloneNode(true)
        container.appendChild(div)

        let addProjectbtn = document.createElement("button")
        addProjectbtn.textContent = "Add Project"
        addProjectbtn.classList.add("add-project-btn")
        addProjectbtn.addEventListener("click", projectForm)
        container.appendChild(addProjectbtn)
        //Subscribing to the projectadded event
        pubsub.subscribe("projectadded", project.addProject)
        pubsub.subscribe("projectdeleted", project.addProject)
    },
    //Adding the project to the project list
    addProject: projects => {
        let projectList = document.querySelector(".project-container ul")
        projectList.innerHTML = ""
        projects.forEach(project => {
            let projectItem = document.createElement("li")
            projectItem.classList.add("project-item")

            projectItem.innerHTML = `${project.title} <button class="delete-project">X</button>`
            const deleteProjectBtn = projectItem.querySelector(".delete-project")
            deleteProjectBtn.addEventListener("click", () => {
                projectItem.removeEventListener("click", () => taskDOM.render(main, project))
                const li = deleteProjectBtn.closest("li")
                li.remove()
                deleteProject(project)
            })
            //adding the event listener to open the task
            const main = document.querySelector("main")
            projectItem.addEventListener("click", () => taskDOM.render(main, project))

            projectList.appendChild(projectItem)
        })
    }

}