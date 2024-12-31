import { taskForm } from "./taskForm";
import { addTask, deleteTask } from "./taskModal";
import { pubsub } from "./pubsub";
import { projectList } from "./projectModal";

export const taskDOM = {
    //rendering task on main container
    render: (container, project) => {

        let taskContainerTemplate = document.querySelector("#taskContainerTemplate")
        let div = taskContainerTemplate.content.cloneNode(true)
        container.innerHTML = ""
        container.appendChild(div)

        if (!(projectList.some(obj => obj['title'] === project['title']))) {
            container.innerHTML = "No project"
            return
        }

        if (project.tasks.length === 0) {
            let taskContainer = document.querySelector(".task-container")
            taskContainer.innerHTML = "No tasks added yet"
        }
        else {
            let taskContainer = document.querySelector(".task-container")
            taskContainer.innerHTML = ""
            project.tasks.forEach(task => {
                let taskTemplate = document.querySelector("#taskTemplate")
                let taskDiv = taskTemplate.content.cloneNode(true)
                taskDiv.querySelector(".task-title").textContent = task.title
                taskDiv.querySelector(".task-notes").textContent = task.notes
                taskDiv.querySelector(".task-due-date").textContent = task.dueDate
                taskDiv.querySelector(".task-priority").textContent = task.priority
                taskContainer.appendChild(taskDiv)
            })
        }

        let addtaskbtn = document.querySelector(".add-task-btn")
        addtaskbtn.addEventListener("click", () => {
            taskForm(project)
            // pubsub.subscribe("formsubmitted", addTask)
            // addTask(project, task)
            // taskForm(project)
        })
        pubsub.subscribe("taskadded", taskDOM.addTask)
    },

    //Adding task to the project
    addTask: project => {
        let taskContainer = document.querySelector(".task-container")
        taskContainer.innerHTML = ""
        project.tasks.forEach(task => {
            let taskTemplate = document.querySelector("#taskTemplate")
            let taskDiv = taskTemplate.content.cloneNode(true)
            // taskDiv.className="taskDiv"
            taskDiv.querySelector(".task-title").textContent = task.title
            taskDiv.querySelector(".task-notes").textContent = task.notes
            taskDiv.querySelector(".task-due-date").textContent = task.dueDate
            taskDiv.querySelector(".task-priority").textContent = task.priority
            //Adding the delete task button event listener
            const deletetaskbtn = taskDiv.querySelector(".deleteTask")
            deletetaskbtn.addEventListener("click", () => {
                const li = deletetaskbtn.closest("li")
                li.remove()
                deleteTask(project, task)
                console.log(projectList)
            })

            const edittaskbtn = taskDiv.querySelector(".editTask")
            taskContainer.appendChild(taskDiv)
            // Adding the edit task button event listener
            edittaskbtn.addEventListener("click", (edittaskbtn) => {
                let taskDiv = edittaskbtn.target.closest("li")
                const taskTitle = taskDiv.querySelector(".task-title");
                const taskNotes = taskDiv.querySelector(".task-notes");
                const taskDueDate = taskDiv.querySelector(".task-due-date");
                const taskPriority = taskDiv.querySelector(".task-priority");

                const index = project.tasks.findIndex(el =>
                    el.title === taskTitle.textContent &&
                    el.notes === taskNotes.textContent &&
                    el.dueDate === taskDueDate.textContent &&
                    el.priority === taskPriority.textContent
                )

                const formTemplate = document.querySelector("#taskformtemplate")
                const div = formTemplate.content.cloneNode(true)
                taskDiv.appendChild(div)
                const taskformbox = document.querySelector("dialog")
                taskformbox.showModal()
                let form = document.querySelector("#form")
                const submit = document.querySelector("#submit-task")
                submit.innerHTML = "Save"
                submit.addEventListener("click", (e) => {
                    e.preventDefault()
                    project.tasks[index].title = form.title.value
                    project.tasks[index].notes = form.notes.value
                    project.tasks[index].dueDate = form.dueDate.value
                    project.tasks[index].priority = form.priority.value
                    taskTitle.textContent = form.title.value
                    taskNotes.textContent = form.notes.value
                    taskDueDate.textContent = form.dueDate.value
                    taskPriority.textContent = form.priority.value
                    taskformbox.remove()
                })
            })
        })
    }
}
