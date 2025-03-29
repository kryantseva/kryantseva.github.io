import { createElement } from '../framework/render.js';

function createClearTrashButtonComponentTemplate() {
    return `<button class="clear-btn">X Очистить</button>`;
}

export default class ClearTrashButtonComponent {
    getTemplate() {
        return createClearTrashButtonComponentTemplate();
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