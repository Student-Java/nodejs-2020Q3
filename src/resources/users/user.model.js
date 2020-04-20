const mongoose = require('mongoose');
const { addMethods } = require('../../utils/toResponse');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' }
);

addMethods(User);

module.exports = mongoose.model('users', User);
