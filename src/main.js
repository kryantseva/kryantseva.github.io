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

const sections = [
    { class: 'backlog', title: 'Бэклог' },
    { class: 'in-progress', title: 'В процессе' },
    { class: 'done', title: 'Готово' },
    { class: 'trash', title: 'Корзина' },
];

for (const section of sections) {
    const tasksContainer = container.querySelector(`.${section.class} .tasks`);
    if (tasksContainer) {
        for (let i = 0; i < 4; i++) {
            render(new TaskComponent(`Задача ${i + 1} ${section.title}`, `${section.class}-task`), tasksContainer, RenderPosition.BEFOREEND);
        }
    }
}
