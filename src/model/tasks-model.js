import { tasks } from '../mock/task.js';
import { generateId } from '../utils.js';

export default class TasksModel {
  #boardtasks = tasks;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateId(),
      title,
      status: 'backlog',
    };
    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  updateTasks(newTasks) {
    this.#boardtasks = newTasks;
    this._notifyObservers();
  }

  updateTaskStatus(taskId, newStatus, beforeId = null) {
    const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      const taskToMove = this.#boardtasks.splice(taskIndex, 1)[0];
      taskToMove.status = newStatus;

      if (beforeId) {
        const beforeIndex = this.#boardtasks.findIndex(task => task.id === beforeId);
        if (beforeIndex !== -1) {
          this.#boardtasks.splice(beforeIndex, 0, taskToMove);
        } else {
          this.#boardtasks.push(taskToMove);
        }
      } else {
        this.#boardtasks.push(taskToMove);
      }
      this._notifyObservers();
    }
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }
}