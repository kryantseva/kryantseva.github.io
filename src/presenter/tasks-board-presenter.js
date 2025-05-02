import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';
import ClearTrashButtonComponent from '../view/clear-trash-button-component.js';
import EmptyTasksListComponent from '../view/empty-tasks-list-component.js';
import LoadingViewComponent from '../framework/view/loading-view-component.js';

export default class TasksBoardPresenter {
  #tasksBoardContainer = null;
  #tasksModel = null;
  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];
  #tasksListComponents = {};
  #loadingComponent = new LoadingViewComponent();

  constructor({ tasksBoardContainer, tasksModel }) {
    this.#tasksBoardContainer = tasksBoardContainer;
    this.#tasksModel = tasksModel;
    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    render(this.#loadingComponent, this.#tasksBoardContainer);
    await this.#tasksModel.init();
    this.#loadingComponent.removeElement();
    this.#clearBoard();
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
  }

  async createTask(title) {
    if (!title) {
      return;
    }
    try {
      await this.#tasksModel.addTask(title);
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  }
  #renderEmptyTaskList(container) {
    render(new EmptyTasksListComponent(), container);
  }

  #renderClearButton(tasksListComponent) {
    const hasTrashTasks = this.#boardTasks.some((task) => task.status === Status.TRASH);
  
    // Если в корзине есть задачи, рендерим кнопку очистки
    if (hasTrashTasks) {
      if (!tasksListComponent.clearButton) {
        const clearButtonComponent = new ClearTrashButtonComponent({
          onClick: this.#handleClearTrashButtonClick.bind(this),
        });
        render(clearButtonComponent, tasksListComponent.element);
        tasksListComponent.setClearButton(clearButtonComponent);
      }
    } else {
      // Если корзина пуста, удаляем кнопку очистки
      if (tasksListComponent.clearButton) {
        tasksListComponent.clearButton.removeElement();
        tasksListComponent.clearButton = null;
      }
    }
  }
  
  // При любом обновлении списка задач (например, после создания или удаления задачи), нужно проверять корзину:
  #handleModelEvent(event, payload) {
    switch (event) {
      case UpdateType.INIT:
      case UserAction.ADD_TASK:
      case UserAction.UPDATE_TASK:
      case UserAction.DELETE_TASK:
        // Перерендерим задачи после изменения и обновим отображение корзины
        this.#clearBoard();
        this.#boardTasks = [...this.#tasksModel.tasks];
        this.#renderBoard();
        break;
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
      this.#renderClearButton(tasksListComponent);
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


  async #handleClearTrashButtonClick() {
    try {
      await this.#tasksModel.clearBasketTasks();
    } catch (err) {
      console.error('Ошибка при очистке корзины:', err);
    }
  }

  async #handleTaskDrop(taskId, newStatus, beforeId) {
    try {
      await this.#tasksModel.updateTaskStatus(taskId, newStatus);
    } catch (err) {
      console.error('Ошибка при обновлении статуса задачи:', err);
    }
  }

  #renderTasks(status, tasksListComponent) {
    const tasksForStatus = this.#boardTasks.filter((task) => task.status === status);
    tasksListComponent._renderTasks(tasksForStatus);
  }
}