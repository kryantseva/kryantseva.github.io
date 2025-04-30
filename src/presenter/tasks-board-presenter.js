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
  #tasksListComponents = {};

  constructor({ tasksBoardContainer, tasksModel }) {
    this.#tasksBoardContainer = tasksBoardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  createTask(title) {
    this.#tasksModel.addTask(title);
  }

  #renderEmptyTaskList(container) {
    render(new EmptyTasksListComponent(), container);
  }

  #renderClearButton(tasksListComponent) {
    if (this.#boardTasks.some((task) => task.status === Status.TRASH)) {
      const clearButtonComponent = new ClearTrashButtonComponent({
        onClick: this.#handleClearTrashButtonClick.bind(this)
      });
      render(clearButtonComponent, tasksListComponent.element);
      tasksListComponent.setClearButton(clearButtonComponent);
    } else if (tasksListComponent.clearButton) {
      tasksListComponent.clearButton.removeElement();
      tasksListComponent.clearButton = null;
    }
  }

  #renderTasksList(status, container) {
    const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);
    const tasksListComponent = new TasksListComponent({
      status: status,
      label: StatusLabel[status],
      onTaskDrop: this.#handleTaskDrop.bind(this),
    });
    render(tasksListComponent, container);
    tasksListComponent._renderTasks(tasksForStatus);
    this.#tasksListComponents[status] = tasksListComponent;

    if (status === Status.TRASH) {
      this.#renderClearButton(tasksListComponent); // Вот эта строка была пропущена
    }

    return tasksListComponent;
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    taskComponent.element.dataset.taskId = task.id;
    render(taskComponent, container);
  }

  #clearBoard() {
    this.#tasksBoardComponent.element.innerHTML = '';
    this.#tasksListComponents = {};
  }

  #renderBoard() {
    render(this.#tasksBoardComponent, this.#tasksBoardContainer);
    const taskSections = this.#tasksBoardComponent.element;

    Object.values(Status).forEach((status) => {
      this.#renderTasksList(status, taskSections);
    });
  }

  #handleModelChange() {
    this.#clearBoard();
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  #handleClearTrashButtonClick() {
    const updatedTasks = this.#tasksModel.tasks.filter(task => task.status !== Status.TRASH);
    this.#tasksModel.updateTasks(updatedTasks);
  }

  #handleTaskDrop(taskId, newStatus, beforeId) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus, beforeId);
  }
}