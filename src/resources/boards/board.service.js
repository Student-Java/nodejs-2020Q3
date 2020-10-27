const boardsRepo = require('./board.db.repository');
const { removeByBoard } = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const remove = async id => {
  await boardsRepo.remove(id);
  await removeByBoard(id);
};

const save = board => boardsRepo.save(board);

const update = (id, board) => boardsRepo.update(id, board);

module.exports = { getAll, get, remove, save, update };
