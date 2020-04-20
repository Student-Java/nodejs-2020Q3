const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, id) => Task.findOne({ _id: id, boardId });

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

module.exports = { getAll, get, save, update, updateMany, remove };
