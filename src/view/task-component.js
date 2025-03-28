import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(taskText, taskClass) {
  return `<div class="task ${taskClass}">${taskText}</div>`;
}

export default class TaskComponent {
  constructor(taskText, taskClass) {
    this.taskText = taskText;
    this.taskClass = taskClass;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.taskText, this.taskClass);
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