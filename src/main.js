import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';

const bodyContainer = document.querySelector('.container');
const tasksBoardContainer = document.querySelector('.task-sections');

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), bodyContainer);

tasksBoardPresenter.init();