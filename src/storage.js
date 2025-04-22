// src/storage.js

import { pubsub } from "./pubsub";

export const saveProjects = (projects) => {
    localStorage.setItem('projectList', JSON.stringify(projects));
    const getList = localStorage.getItem('projectList');
    pubsub.publish('projectaddedToStorage', JSON.parse(getList));
}
