import { AbstractComponent } from '../framework/view/abstract-component.js';

function createEmptyTasksListTemplate() {
  return `
    <p class="board__no-tasks">
      Перетащите карточку
    </p>
  `;
}

export default class EmptyTasksListComponent extends AbstractComponent {
  get template() {
    return createEmptyTasksListTemplate();
  }
}