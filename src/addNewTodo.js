import { addTodoItem } from './todoListModule';
import { getTodoInputValue, clearTodoInput } from './domModule';

document.getElementById('addTodo').addEventListener('click', function() {
    const todoText = getTodoInputValue();
    if (todoText.trim() !== '') {
        addTodoItem(todoText);
        clearTodoInput();
    }
});