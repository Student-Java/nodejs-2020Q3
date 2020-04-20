const taskRepo = require('./task.db.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, id) => taskRepo.get(boardId, id);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

const save = task => taskRepo.save(task);

const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

const updateMany = (filter, updates) => taskRepo.updateMany(filter, updates);

const removeByBoard = boardId => taskRepo.removeByBoardId(boardId);

module.exports = {
  getAll,
  get,
  remove,
  save,
  update,
  updateMany,
  removeByBoard
};
