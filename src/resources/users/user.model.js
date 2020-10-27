const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

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
