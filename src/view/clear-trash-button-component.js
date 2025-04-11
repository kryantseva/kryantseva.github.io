import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearTrashButtonComponentTemplate() {
  return `<button class="clear-btn">X Очистить</button>`;
}

export default class ClearTrashButtonComponent extends AbstractComponent {
  get template() {
    return createClearTrashButtonComponentTemplate();
  }
}