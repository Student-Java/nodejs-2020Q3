const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards' }
);

addMethods(Board);

module.exports = mongoose.model('boards', Board);
