import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskBoardComponentTemplate() {
  return `<div class="task-sections"></div>`;
}

export default class TaskBoardComponent extends AbstractComponent {
  get template() {
    return createTaskBoardComponentTemplate();
  }
}