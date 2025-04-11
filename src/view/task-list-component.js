import { AbstractComponent } from '../framework/view/abstract-component.js';
import { StatusLabel } from "../const.js";

function createTaskListComponentTemplate(status, label) {
  return `<div class="section ${status}">
            <h2>${label}</h2>
            <div class="tasks">
            </div>
          </div>`;
}

export default class TasksListComponent extends AbstractComponent {
  #status = null;
  #label = null;
  #clearButtonComponent = null;

  constructor({ status, label }) { 
    super();
    this.#status = status;
    this.#label = label;
  }

  get template() {
    return createTaskListComponentTemplate(this.#status, this.#label);
  }

  setClearButton(clearButtonComponent) {
    this.#clearButtonComponent = clearButtonComponent;
    const tasksContainer = this.element.querySelector('.tasks');
    if (tasksContainer && this.#clearButtonComponent) {
      this.element.append(this.#clearButtonComponent.element);
    }
  }

  getTasksContainer() {
    return this.element.querySelector('.tasks');
  }
}