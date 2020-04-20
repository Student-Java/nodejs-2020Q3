const User = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => User.findOne({ _id: id });

const save = async user => User.create(user);

const update = async (id, user) =>
  User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

const remove = async id => {
  const res = await User.deleteOne({ _id: id });
  if (res.deletedCount !== 1) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
};

module.exports = { getAll, get, save, update, remove };
