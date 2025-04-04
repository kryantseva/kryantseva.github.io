import HeaderComponent from './view/header-component.js';
import AddTaskComponent from './view/add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';

const boardAppContainer = document.querySelector('.board-app');
const addTaskContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

render(new HeaderComponent(), boardAppContainer, RenderPosition.BEFOREBEGIN);
render(new AddTaskComponent(), addTaskContainer);

const tasksModel = new TasksModel();

const tasksBoardPresenter = new TasksBoardPresenter({
    tasksBoardContainer: taskboardContainer, 
    tasksModel,
});

tasksBoardPresenter.init();