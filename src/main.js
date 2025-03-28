import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TaskListComponent from './view/task-list-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.new-task-container'); 
const mainContainer = document.querySelector('.board-app__main'); 

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);

const taskBoard = new TaskBoardComponent();
render(taskBoard, mainContainer);

const taskLists = [
  { title: 'Бэклог', tasks: ['Выучить JS', 'Выучить React', 'Сделать домашку'] },
  { title: 'В процессе', tasks: ['Выпить смузи', 'Попить воды'] },
  { title: 'Готово', tasks: ['Позвонить маме', 'Погладить кота'] },
  { title: 'Корзина', tasks: ['Сходить погулять', 'Прочитать книгу'] },
];

const taskBoardInner = taskBoard.getElement().querySelector('.taskboard__inner');

taskLists.forEach(({ title, tasks }) => {
  const taskList = new TaskListComponent(title);
  render(taskList, taskBoardInner);

  const taskContainer = taskList.getElement().querySelector('.tasks');
  tasks.forEach(taskText => {
    render(new TaskComponent(taskText), taskContainer);
  });
});
