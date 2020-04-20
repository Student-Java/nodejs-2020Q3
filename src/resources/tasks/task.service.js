const Task = require('./task.model');
const taskRepo = require('./task.db.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, id) => taskRepo.get(boardId, id);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

const save = task => taskRepo.save(task);

const update = (boardId, id, task) =>
  taskRepo.update(boardId, id, new Task(task));

const updateMany = (filter, updates) => updateMany(filter, updates);

module.exports = { getAll, get, remove, save, update, updateMany };
