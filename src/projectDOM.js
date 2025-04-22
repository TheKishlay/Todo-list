import { pubsub } from "./pubsub"
import { projectForm } from "./projectForm"
import { deleteProject, projectList } from "./projectModal"
import { taskDOM } from "./taskDOM"

export const project = {

    //rendering the project DOM

    render: container => {
        const main = document.querySelector("main")
        main.innerHTML = "No project selected!" // Clear the main container

        //Template for the project
        let template = document.querySelector("#projectTemplate")
        let div = template.content.cloneNode(true)
        container.appendChild(div)

        // fetching project list from localStorage
        let projects = JSON.parse(localStorage.getItem("projectList")) ? JSON.parse(localStorage.getItem("projectList")) : []


        //checking localStorage for the project list
        if (projects.length !== 0) {
            project.addProject(projects)
        }

        //adding button for adding project
        let addProjectbtn = document.createElement("button")
        addProjectbtn.textContent = "Add Project"
        addProjectbtn.classList.add("add-project-btn")
        addProjectbtn.addEventListener("click", () => projectForm(projects))
        container.appendChild(addProjectbtn)



        //Subscribing to the projectadded event

        pubsub.subscribe("projectaddedToStorage", project.addProject)
        pubsub.subscribe("projectdeleted", project.addProject)
    },

    //Adding the project to the project list

    addProject: projects => {
        console.log(projects)
        let projectContainer = document.querySelector(".project-container ul")
        projectContainer.innerHTML = ""
        let projectPointer = 0
        projects.forEach(project => {
            const curProjectPointer = projectPointer
            //Creating the project item
            let projectItem = document.createElement("li")
            projectItem.classList.add("project-item")

            projectItem.innerHTML = `${Object.keys(projects[projectPointer])[0]} <button class="delete-project">X</button>`

            const main = document.querySelector("main")


            //function to handle click event listener on project item
            const handleprojectClick = () => {
                taskDOM.render(main, projects, curProjectPointer)
                const projectItems = document.querySelectorAll(".project-item")
                projectItems.forEach(item => {
                    item.classList.remove("activeproject")
                })
                projectItem.classList.add("activeproject")
            }


            //Adding the event listener to the project item
            projectItem.addEventListener("click", handleprojectClick)

            //Adding the event listener to delete the project
            const deleteProjectBtn = projectItem.querySelector(".delete-project")
            deleteProjectBtn.addEventListener("click", () => {
                projectItem.removeEventListener("click", handleprojectClick) // Remove the click event listener

                //removing the project from the project list
                projectItem.remove()
                deleteProject(projects, curProjectPointer)
                main.innerHTML = "No project selected!" // Clear the main container
            })


            projectContainer.appendChild(projectItem)
            projectPointer++
        })
    }

}
