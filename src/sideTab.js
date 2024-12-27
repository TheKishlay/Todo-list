const body = document.querySelector("body")
const container = document.querySelector(".container")

const sideTab = document.createElement("div")
sideTab.className = "sideTab"
const todolist = document.createElement("div")
todolist.className = "todolist"

const addtodoBtn = document.createElement('button')
addtodoBtn.id = "addTodo"
addtodoBtn.textContent = "New Todo"

sideTab.appendChild(todolist)
sideTab.appendChild(addtodoBtn)
container.appendChild(sideTab)


export default container