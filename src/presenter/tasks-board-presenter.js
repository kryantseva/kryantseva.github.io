import TasksListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskBoardComponent from '../view/task-board-component.js';
import { render } from '../framework/render.js';
import {Status} from "../const.js";

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;

    #tasksBoardComponent = new TaskBoardComponent();

    #boardTasks = [];

    constructor({ boardContainer, tasksModel }) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#tasksBoardComponent, this.#boardContainer);

        const taskSections = this.#tasksBoardComponent.getElement();

        for (const status of Object.values(Status)){
            const tasksListComponent = new TasksListComponent(status);
            render(tasksListComponent, taskSections);
            const tasksContainer = taskListComponent.getElement().querySelector('.tasks');
            const filteredTasks = this.#boardTasks.filter((task) => task.status === status);
            for (const task of filteredTasks) {
                const taskComponent = new TaskComponent({ task });
                render(taskComponent, tasksContainer);
            }
        }
    }
}