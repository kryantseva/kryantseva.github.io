import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title, taskClass) {
  return `<div class="section ${taskClass}">
              <h2>${title}</h2>
              <div class="tasks">
              </div>
          </div>`;
}

export default class TaskListComponent {
  constructor(title, taskClass) {
    this.title = title;
    this.taskClass = taskClass;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title, this.taskClass);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}