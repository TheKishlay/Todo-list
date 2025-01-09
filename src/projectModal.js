import { pubsub } from "./pubsub"
import { saveProjects } from "./storage"

export let projectList = localStorage.getItem("projectList") ? JSON.parse(localStorage.getItem("projectList")) : []

export function CreateProject(title) {
    let obj = {}
    obj[title] = []
    return obj
}

export function deleteProject(project) {
    projectList = projectList.filter(item => item !== project)
    pubsub.publish("projectdeleted", projectList)
}

export function addProject(title) {
    projectList.push(CreateProject(title))
    saveProjects(projectList)
}
