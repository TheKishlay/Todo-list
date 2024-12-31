import { addProject } from "./projectModal.js"


export function projectForm() {
    const projectInfoBox = document.createElement("dialog")
    projectInfoBox.classList.add("project-info-box")
    const input = document.createElement("input")
    input.classList.add("project-title")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Enter the title of the project")
    projectInfoBox.appendChild(input)
    const submit = document.createElement("button")
    submit.classList.add("submit-project")
    submit.textContent = "Add"
    projectInfoBox.appendChild(submit)
    const cancel = document.createElement("button")
    cancel.classList.add("cancel-project")
    cancel.textContent = "Cancel"
    projectInfoBox.appendChild(cancel)
    cancel.addEventListener("click", () => {
        projectInfoBox.remove()
    })

    const wrapper = document.querySelector(".wrapper")
    wrapper.appendChild(projectInfoBox)
    projectInfoBox.showModal()
    submit.addEventListener("click", () => {
        let title = input.value
        addProject(title)
        projectInfoBox.remove()
    })
}