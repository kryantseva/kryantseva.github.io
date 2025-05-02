import Observable from '../framework/observable.js';
import { UserAction, UpdateType } from '../const.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id === taskId);
    if (task) {
      const previousStatus = task.status;
      task.status = newStatus;
      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error('Ошибка при обновлении статуса задачи на сервер:', err);
        task.status = previousStatus;
        throw err;
      }
    }
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter((task) => task.status === 'trash');
    try {
      await Promise.all(basketTasks.map((task) => this.#tasksApiService.deleteTask(task.id)));
      this.#boardtasks = this.#boardtasks.filter((task) => task.status !== 'trash');
      this._notify(UserAction.DELETE_TASK, { status: 'trash' });
    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервер:', err);
      throw err;
    }
  }
  
  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === 'trash');
  }

  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === 'trash');
  }
}