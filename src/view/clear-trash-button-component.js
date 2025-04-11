import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearTrashButtonComponentTemplate() {
  return `<button class="clear-btn">X Очистить</button>`;
}

export default class ClearTrashButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createClearTrashButtonComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}