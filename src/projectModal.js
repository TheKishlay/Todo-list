import { pubsub } from "./pubsub";
import { saveProjects } from "./storage";

export function CreateProject(title) {
    let obj = {};
    obj[title] = [];
    return obj;
}

export function deleteProject(projects, projectPointer) {
    console.log("before", projects);

    // remove the project from the projectList
    projects.splice(projectPointer, 1);
    console.log("after splice", projects);

    // Update localStorage
    localStorage.setItem("projectList", JSON.stringify(projects));

    console.log("after", projects);

    // Publish the event to notify other modules
    pubsub.publish("projectdeleted", projects);

    // Optional: Manually update the UI if needed
    // const projectListElement = document.querySelector(".project-container ul");
    // if (projectListElement) {
    //     const projectItem = [...projectListElement.children].find(
    //         li => li.textContent.includes(projectKey)
    //     );
    //     if (projectItem) projectItem.remove();
    // }
}

export function addProject(title, projects) {
    console.log("before adding project:", projects);

    // Add the new project
    projects.push(CreateProject(title));

    // Save to localStorage
    saveProjects(projects);

    console.log("after adding project:", projects);
}