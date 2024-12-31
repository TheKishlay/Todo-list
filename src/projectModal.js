import { pubsub } from "./pubsub"

export let projectList = []

export function CreateProject(title) {
    let tasks = []
    return { title, tasks }
}

export function deleteProject(project) {
    projectList = projectList.filter(item => item !== project)
    pubsub.publish("projectdeleted", projectList)
}

export function addProject(title) {
    projectList.push(CreateProject(title))
    pubsub.publish("projectadded", projectList)
}
