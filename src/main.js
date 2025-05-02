import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/tasks-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://681490f8225ff1af16294358.mockapi.io';
const boardAppContainer = document.querySelector('.board-app');
const addTaskContainer = document.querySelector('.add-task');
const taskboardContainer = document.querySelector('.taskboard');

const tasksApiService = new TasksApiService(END_POINT);
const tasksModel = new TasksModel({ tasksApiService });
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