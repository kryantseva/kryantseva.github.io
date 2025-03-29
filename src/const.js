const Status = {
    BACKLOG: 'backlog',
    IN_PROGRESS: 'in-progress',
    DONE: 'done',
    TRASH: 'trash',
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.IN_PROGRESS]: 'В процессе',
    [Status.DONE]: 'Готово',
    [Status.TRASH]: 'Корзина',
};

export { Status, StatusLabel };