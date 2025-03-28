import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TaskBoardComponent from './view/task-board-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const container = document.querySelector('.container');

render(new HeaderComponent(), container, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), container, RenderPosition.BEFOREEND);

const taskBoard = new TaskBoardComponent();
render(taskBoard, container, RenderPosition.BEFOREEND);

const backlogTasks = container.querySelector('.backlog .tasks');
const inProgressTasks = container.querySelector('.in-progress .tasks');
const doneTasks = container.querySelector('.done .tasks');
const trashTasks = container.querySelector('.trash .tasks');

for (let i = 0; i < 4; i++) {
    render(new TaskComponent(`Задача ${i + 1} Бэклог`, 'backlog-task'), backlogTasks, RenderPosition.BEFOREEND);
}

for (let i = 0; i < 4; i++) {
    render(new TaskComponent(`Задача ${i + 1} В процессе`, 'in-progress-task'), inProgressTasks, RenderPosition.BEFOREEND);
}

for (let i = 0; i < 4; i++) {
    render(new TaskComponent(`Задача ${i + 1} Готово`, 'done-task'), doneTasks, RenderPosition.BEFOREEND);
}

for (let i = 0; i < 4; i++) {
    render(new TaskComponent(`Задача ${i + 1} Корзина`, 'trash-task'), trashTasks, RenderPosition.BEFOREEND);
}