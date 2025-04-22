import { taskForm } from "./taskForm";
import { addTask, deleteTask, editTask } from "./taskModal";
import { pubsub } from "./pubsub";
export const taskDOM = {

    //rendering task on main container

    render: (container, projects, projectPointer) => {

        pubsub.subscribe("taskadded", taskDOM.addTask)
        //Template for the task container
        let taskContainerTemplate = document.querySelector("#taskContainerTemplate")
        let div = taskContainerTemplate.content.cloneNode(true)
        container.innerHTML = ""
        container.appendChild(div)

        //checking if task list is empty
        console.log(projects[projectPointer][Object.keys(projects[projectPointer])[0]])

        if (projects[projectPointer][Object.keys(projects[projectPointer])[0]].length === 0) {
            let taskContainer = document.querySelector(".task-container")
            taskContainer.innerHTML = "No tasks added yet"
        }
        else {
            //Rendering the tasks
            pubsub.publish("taskadded", [projects, projectPointer])
        }

        //Adding the add task button event listener
        let addtaskbtn = document.querySelector(".add-task-btn")
        addtaskbtn.addEventListener("click", () => {
            taskForm(projects, projectPointer)
        })

    },

    //Adding task to the project

    addTask: ([project, projectPointers]) => {
        let [projects, projectPointer] = [project, projectPointers] // Destructure the array
        let taskList = projects[projectPointer][Object.keys(projects[projectPointer])[0]]
        let taskContainer = document.querySelector(".task-container")
        taskContainer.innerHTML = ""
        taskList.forEach(task => {
            const curProjectPointer = projectPointer
            //Creating the task item
            let taskTemplate = document.querySelector("#taskTemplate")
            let taskDiv = taskTemplate.content.cloneNode(true)
            taskDiv.querySelector(".task-title").textContent = task.title
            taskDiv.querySelector(".task-notes").textContent = task.notes
            taskDiv.querySelector(".task-due-date").textContent = task.dueDate
            taskDiv.querySelector(".task-priority").textContent = task.priority

            //Adding the delete task button event listener

            const deletetaskbtn = taskDiv.querySelector(".deleteTask")
            deletetaskbtn.addEventListener("click", () => {
                const li = deletetaskbtn.closest("li")
                li.remove()
                deleteTask(projects, curProjectPointer, task)
                //checking if task list is empty to display message
                if (projects[projectPointer][Object.keys(projects[projectPointer])[0]].length === 0) {
                    let taskContainer = document.querySelector(".task-container")
                    taskContainer.innerHTML = "No tasks added yet"
                }
            })

            const edittaskbtn = taskDiv.querySelector(".editTask")
            taskContainer.appendChild(taskDiv)

            // Adding the edit task button event listener
            edittaskbtn.addEventListener("click", handleClick)

            function handleClick(event) {
                editTask(event.target, projects, projectPointer, task)
                const li = event.target.closest("li")
                li.classList.add("activeproject")
            }

        })
    }
}
