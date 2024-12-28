import { pubsub } from "./pubsub"

function formsubmit(){
    let template = document.querySelector("#taskformtemplate")
    let div = template.content.cloneNode(true) 
    let wrapper = document.querySelector(".wrapper")
    wrapper.appendChild(div)
    let dialog = document.querySelector("dialog")
    dialog.showModal()
    let form = document.querySelector("form")

    let submitbtn = document.querySelector("#submit")

    submitbtn.addEventListener("click", (e) => {
        pubsub.publish("taskadded", form)
    })
}

export {formsubmit}