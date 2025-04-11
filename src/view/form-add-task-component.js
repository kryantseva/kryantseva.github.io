import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `<div class="new-task-container">
            <h3 class="task-header">Новая задача</h3>
            <form class="new-task" id="add-task-form">
              <input type="text" placeholder="Название задачи..." id="new-task-title" required>
              <button type="submit">+ Добавить</button>
            </form>
          </div>`;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleFormSubmit = null;

  constructor({ onFormSubmit }) {
    super();
    this.#handleFormSubmit = onFormSubmit;
    this.element.addEventListener('submit', this.#submitHandler);
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    const taskTitle = this.element.querySelector('#new-task-title').value.trim();
    if (taskTitle) {
      this.#handleFormSubmit(taskTitle);
      this.element.querySelector('#new-task-title').value = ''; // Очистка поля ввода
    }
  };
}