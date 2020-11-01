const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersRepo = require('./user.db.repository');
const { JWT_SECRET_KEY, JWT_EXPIRE_TIME } = require('../../common/config');
const { updateMany } = require('../tasks/task.service');

const { AUTHENTICATION_ERROR } = require('../../errors/appErrors');

const authenticate = async user => {
  const userEntity = await usersRepo.getByLogin(user.login);

  const isValidated = await bcrypt.compare(user.password, userEntity.password);
  if (!isValidated) {
    throw new AUTHENTICATION_ERROR();
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME
  });

  return { token, userId: userEntity._id, name: userEntity.name };
};

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = async id => {
  await usersRepo.remove(id);
  await updateMany({ userId: id }, { userId: null });
};

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { authenticate, getAll, get, remove, save, update };
