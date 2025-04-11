import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';
import ClearTrashButtonComponent from '../view/clear-trash-button-component.js';
import EmptyTasksListComponent from '../view/empty-tasks-list-component.js';

export default class TasksBoardPresenter {
  #tasksBoardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ tasksBoardContainer, tasksModel }) {
    this.#tasksBoardContainer = tasksBoardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #renderEmptyTaskList(container) {
    render(new EmptyTasksListComponent(), container);
  }

  #renderClearButton(tasksListComponent) {
    if (this.#boardTasks.some((task) => task.status === Status.TRASH)) {
      const clearButtonComponent = new ClearTrashButtonComponent();
      render(clearButtonComponent, tasksListComponent.element);
      tasksListComponent.setClearButton(clearButtonComponent);
    }
  }

  #renderTasksList(status, container) {
    const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);
    const tasksListComponent = new TasksListComponent({ status: status, label: StatusLabel[status] });
    render(tasksListComponent, container);
    const tasksContainer = tasksListComponent.getTasksContainer();

    if (tasksForStatus.length > 0) {
      tasksForStatus.forEach((task) => this.#renderTask(task, tasksContainer));
    } else { 
      this.#renderEmptyTaskList(tasksContainer);
    }

    if (status === Status.TRASH) {
      this.#renderClearButton(tasksListComponent);
    }

    return tasksListComponent;
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task }); // Передаем объект
    render(taskComponent, container);
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#tasksBoardContainer);
    const taskSections = this.#tasksBoardComponent.element;

    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status, taskSections);
    });
  }
}