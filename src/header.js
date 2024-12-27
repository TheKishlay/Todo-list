import logoImg from "./Images/Todo Logo.jpg"
// Selecting header to add elements to it
const header = document.querySelector("header")

//Logo: Creating image element to add logo
const logoImage = document.createElement("img")

logoImage.src = logoImg
logoImage.alt = "Logo"
header.appendChild(logoImage)

//Page headline creation
const headline = document.createElement("h1")
headline.innerHTML = `TODO LIST`
header.appendChild(headline)

export default header