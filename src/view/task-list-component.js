import { AbstractComponent } from '../framework/view/abstract-component.js';
import { StatusLabel } from "../const.js";
import EmptyTasksListComponent from './empty-tasks-list-component.js';
import TaskComponent from './task-component.js';
import { render } from '../framework/render.js';

function createTaskListComponentTemplate(status, label) {
  return `<div class="section ${status}">
            <h2>${label}</h2>
            <div class="tasks">
            </div>
          </div>`;
}

export default class TasksListComponent extends AbstractComponent {
  #status = null;
  #label = null;
  #clearButtonComponent = null;
  #onTaskDrop = null;

  constructor({ status, label, onTaskDrop }) {
    super();
    this.#status = status;
    this.#label = label;
    this.#onTaskDrop = onTaskDrop;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponentTemplate(this.#status, this.#label);
  }

  setClearButton(clearButtonComponent) {
    this.#clearButtonComponent = clearButtonComponent;
    const tasksContainer = this.element.querySelector('.tasks');
    if (tasksContainer && this.#clearButtonComponent) {
      this.element.append(this.#clearButtonComponent.element);
    }
  }

  getTasksContainer() {
    return this.element.querySelector('.tasks');
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element.querySelector('.tasks');

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
      const draggedElement = event.dataTransfer.getData('text/plain');
      const targetElement = event.target.closest('.task');
      const dropEndElement = event.target.closest('.drop-end');

      container.querySelectorAll('.task').forEach(el => el.classList.remove('drag-over'));
      container.querySelectorAll('.drop-end').forEach(el => el.classList.remove('drag-over-end'));

      if (targetElement && draggedElement !== targetElement.dataset.taskId) {
        targetElement.classList.add('drag-over');
      } else if (dropEndElement) {
        dropEndElement.classList.add('drag-over-end');
      }
    });

    container.addEventListener('dragleave', () => {
      container.querySelectorAll('.task').forEach(el => el.classList.remove('drag-over'));
      container.querySelectorAll('.drop-end').forEach(el => el.classList.remove('drag-over-end'));
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      container.querySelectorAll('.task').forEach(el => el.classList.remove('drag-over'));
      container.querySelectorAll('.drop-end').forEach(el => el.classList.remove('drag-over-end'));

      const taskId = event.dataTransfer.getData('text/plain');
      const draggedElement = container.querySelector(`[data-task-id="${taskId}"]`);
      const targetElement = event.target.closest('.task');
      const dropEndElement = event.target.closest('.drop-end');
      let beforeElement = null;

      if (targetElement && targetElement.dataset.taskId !== taskId) {
        beforeElement = targetElement;
      } else if (dropEndElement) {
        beforeElement = null;
      }

      if (draggedElement) {
        if (beforeElement) {
          container.insertBefore(draggedElement, beforeElement);
        } else if (dropEndElement) {
          container.appendChild(draggedElement);
        }
      }

      onTaskDrop(taskId, this.#status, beforeElement ? beforeElement.dataset.taskId : null); // Отправляем beforeId
    });
  }

  _renderTasks(tasks) {
    const tasksContainer = this.getTasksContainer();
    tasksContainer.innerHTML = '';

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        const taskComponent = new TaskComponent({ task });
        taskComponent.element.dataset.taskId = task.id;
        render(taskComponent, tasksContainer);
      });
    } else {
      render(new EmptyTasksListComponent(), tasksContainer);
    }

    const dropEndElement = document.createElement('div');
    dropEndElement.classList.add('drop-end');
    tasksContainer.appendChild(dropEndElement);
  }
}