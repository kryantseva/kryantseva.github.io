import { AbstractComponent } from '../framework/view/abstract-component.js';

function createAddTaskComponentTemplate() {
  return `<div class="new-task-container">
            <h3 class="task-header">Новая задача</h3>
            <div class="new-task">
              <input type="text" placeholder="Название задачи...">
              <button>+ Добавить</button>
            </div>
          </div>`;
}

export default class AddTaskComponent extends AbstractComponent {
  get template() {
    return createAddTaskComponentTemplate();
  }
}