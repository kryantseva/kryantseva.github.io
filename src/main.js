import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';

const boardAppContainer = document.querySelector('.board-app');
const addTaskContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

const tasksModel = new TasksModel();
const tasksBoardPresenter = new TasksBoardPresenter({
  tasksBoardContainer: taskboardContainer,
  tasksModel,
});

function handleNewTaskSubmit(taskTitle) {
  tasksBoardPresenter.createTask(taskTitle);
}

const formAddTaskComponent = new FormAddTaskComponent({
  onFormSubmit: handleNewTaskSubmit,
});

render(new HeaderComponent(), boardAppContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, addTaskContainer);

tasksBoardPresenter.init();