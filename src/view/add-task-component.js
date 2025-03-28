import { createElement } from '../framework/render.js';

function createAddTaskComponentTemplate() {
  return `<div class="new-task-container">
              <h3 class="task-header">Новая задача</h3>
              <div class="new-task">
                  <input type="text" placeholder="Название задачи...">
                  <button>+ Добавить</button>
              </div>
          </div>`;
}

export default class AddTaskComponent {
  getTemplate() {
    return createAddTaskComponentTemplate();
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