const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, id) => {
  const task = await Task.findOne({ _id: id, boardId });
  if (!task) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return task;
};

const save = async task => Task.create(task);

const update = async (boardId, id, task) =>
  Task.findOneAndUpdate({ _id: id, boardId }, { $set: task }, { new: true });

const updateMany = async (filter, updates) => Task.updateMany(filter, updates);

const remove = async (boardId, id) => {
  const res = await Task.deleteOne({ _id: id, boardId });
  if (res.deletedCount !== 1) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
};

const removeByBoardId = async boardId => await Task.deleteMany({ boardId });

module.exports = {
  getAll,
  get,
  save,
  update,
  updateMany,
  remove,
  removeByBoardId
};
