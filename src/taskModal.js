import { pubsub } from "./pubsub"

export function CreateTask(title, notes, dueDate, priority) {
    return { title, notes, dueDate, priority }
}

export function deleteTask(project, task) {
    const index = project.tasks.findIndex(todo => todo === task);
    if (index !== -1) {
        project.tasks.splice(index, 1);
    }
}

export function addTask(project, task) {
    project.tasks.push(task)
    pubsub.publish("taskadded", project)
}