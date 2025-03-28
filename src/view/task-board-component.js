import { createElement } from '../framework/render.js';

function createTaskBoardComponentTemplate() {
  return `<div class="task-sections">
              <div class="section backlog">
                  <h2>Бэклог</h2>
                  <div class="tasks"></div>
              </div>
              <div class="section in-progress">
                  <h2>В процессе</h2>
                  <div class="tasks"></div>
              </div>
              <div class="section done">
                  <h2>Готово</h2>
                  <div class="tasks"></div>
              </div>
              <div class="section trash">
                  <h2>Корзина</h2>
                  <div class="tasks"></div>
                  <button class="clear-btn">X Очистить</button>
              </div>
          </div>`;
}

export default class TaskBoardComponent {
  getTemplate() {
    return createTaskBoardComponentTemplate();
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