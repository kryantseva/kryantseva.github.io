import { createElement } from '../framework/render.js';

function createTaskTemplate(taskText) {
  return `<div class="task">${taskText}</div>`;
}

export default class TaskComponent {
  constructor(taskText) {
    this.taskText = taskText;
  }

  getTemplate() {
    return createTaskTemplate(this.taskText);
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
