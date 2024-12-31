import { pubsub } from "./pubsub"

export function CreateTask(title, notes, dueDate, priority) {
    return { title, notes, dueDate, priority }
}

export function deleteTask(project, task) {
    const index = project.tasks.findIndex(todo => todo === task);
    if (index !== -1) {
        project.tasks.splice(index, 1);
    }
    // project.tasks = project.tasks.filter(item => item !== task)
    // pubsub.publish("taskadded", project)
}

export function addTask(project, task) {
    project.tasks.push(task)
    pubsub.publish("taskadded", project)
}

// let extractformdata  = (form, project) => {
//     console.log(project)
//     const title = form.title.value
//     const notes = form.notes.value
//     const dueDate = form.dueDate.value
//     const priority = form.priority.value
//     let task = CreateTask(title, notes, dueDate, priority)
//     addTask(project, task)
// }

// pubsub.subscribe("formsubmitted", extractformdata)