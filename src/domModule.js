const container = document.querySelector(".container")
const sideTab = document.querySelector(".sideTab")
const todolist = document.querySelector(".todolist")
const addTodoBtn = document.querySelector("#addTodo")

addTodoBtn.addEventListener("click", addTodo)

function addTodo() {
    addTodoBtn.disabled = true
    const form = document.createElement("form")
    form.id = "form"
    form.method = "get"

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    form.appendChild(titleLabel);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'name';
    titleInput.id = 'name';
    form.appendChild(titleInput);

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'What do you want to do?';
    form.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.id = 'description';
    form.appendChild(descriptionInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = "submitButton"
    submitButton.textContent = 'Add Task';
    form.appendChild(submitButton);


    container.appendChild(form)

}

document.querySelector("#submitButton").addEventListener("click", addNewTodo)


export default addTodoBtn