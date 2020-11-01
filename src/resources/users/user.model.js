const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const { addMethods } = require('../../utils/toResponse');

const User = new Schema(
  {
    name: String,
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 5
    }
  },
  { collection: 'users' }
);

User.pre('save', async function preSave(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

User.pre('findOneAndUpdate', async function preUpdate(next) {
  if (this._update.$set.password) {
    this._update.$set.password = await bcrypt.hash(
      this._update.$set.password,
      10
    );
  }

  next();
});

addMethods(User);

module.exports = mongoose.model('users', User);
