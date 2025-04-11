import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  const { title, status } = task;
  return `
    <div class="task ${status}-task">
      <span>${title}</span>
    </div>
  `;
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({ task }) { 
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}