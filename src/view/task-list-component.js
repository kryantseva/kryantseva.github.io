import { createElement } from '../framework/render.js';
import { StatusLabel, Status } from "../const.js";
import ClearTrashButtonComponent from "./clear-trash-button-component.js";
import { render } from "../framework/render.js";

function createTaskListComponentTemplate(status) {
    const clearButton = status === Status.TRASH ? new ClearTrashButtonComponent().getTemplate() : '';

    return `<div class="section ${status}">
                <h2>${StatusLabel[status]}</h2>
                <div class="tasks">
                </div>
                ${clearButton}
            </div>`;
}

export default class TasksListComponent {
    constructor(status) {
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.status);
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