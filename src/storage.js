// src/storage.js

import { pubsub } from "./pubsub";

export const saveProjects = (projects) => {
    localStorage.setItem('projectList', JSON.stringify(projects));
    const getList = localStorage.getItem('projectList');
    pubsub.publish('projectaddedToStorage', JSON.parse(getList));
}

export const saveTodos = (todos) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = () => {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
};

export const clearTodos = () => {
    localStorage.removeItem(STORAGE_KEY);
};