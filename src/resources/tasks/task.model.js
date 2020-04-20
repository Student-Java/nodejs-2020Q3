const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

addMethods(Task);

module.exports = mongoose.model('tasks', Task);
