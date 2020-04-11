const DB = require('../../utils/inMemoryDb');
const { NOT_FOUND_ERROR } = require('../../errors/appError');
const TABLE_NAME = 'Tasks';
const ENTITY_NAME = 'task';

const getAll = async boardId => {
  return DB.getAllEntities(TABLE_NAME).filter(task => task.boardId === boardId);
};

const get = async (boardId, id) => {
  const task = await DB.getEntity(TABLE_NAME, id);

  if (!task || task.boardId !== boardId) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { boardId, id });
  }

  return task;
};

const remove = async (boardId, id) => {
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { boardId, id });
  }
};

const save = async task => {
  return DB.saveEntity(TABLE_NAME, task);
};

const update = async task => {
  await get(task.boardId, task.id);
  return DB.updateEntity(TABLE_NAME, task.id, task);
};

module.exports = { getAll, get, remove, save, update };
