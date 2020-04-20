const Board = require('./board.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findOne({ _id: id });
  if (!board) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return board;
};

const save = async board => Board.create(board);

const update = async (id, board) =>
  Board.findOneAndUpdate({ _id: id }, { $set: board }, { new: true });

const remove = async id => {
  const res = await Board.deleteOne({ _id: id });
  if (res.deletedCount !== 1) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
};

module.exports = { getAll, get, save, update, remove };
