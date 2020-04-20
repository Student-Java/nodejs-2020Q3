const User = require('./user.model');
const usersRepo = require('./user.db.repository');
// const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = async id => {
  await usersRepo.remove(id);
};

const save = user => {
  return usersRepo.save(new User(user));
};

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
