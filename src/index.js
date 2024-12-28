import "./style.css"

import { sidetab } from "./sideTab"

document.addEventListener("DOMContentLoaded", () => {
    let aside = document.querySelector("aside")
    sidetab.render(aside)
})