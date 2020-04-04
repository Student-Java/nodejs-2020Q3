const uuid = require('uuid');
const User = require('../resources/users/user.model');

const db = {
  Users: [],
  Boards: [
    {
      id: uuid(),
      title: 'firstBoard',
      columns: {
        backlog: 'backlog',
        toDo: 'To do',
        inProgress: 'in progress',
        blocked: 'blocked',
        review: 'review',
        done: 'done'
      }
    },
    {
      id: uuid(),
      title: 'secondBoard',
      columns: {
        toDo: 'To do',
        inProgress: 'in progress',
        blocked: 'blocked',
        review: 'review',
        done: 'done'
      }
    }
  ],
  Tasks: [
    {
      id: uuid(),
      title: 'firstTask',
      order: 0,
      description: 'firstTask description',
      userId: 2,
      boardId: 4,
      columnId: 'inProgress'
    },
    {
      id: uuid(),
      title: 'secondTask',
      order: 1,
      description: 'secondTask description',
      userId: 2,
      boardId: 4,
      columnId: 'blocked'
    },
    {
      id: uuid(),
      title: 'thirdTask',
      order: 3,
      description: 'thirdTask description',
      userId: 1,
      boardId: 4,
      columnId: 'review'
    }
  ],
  fixUsersStructure: user => {
    if (user) {
      db.Tasks.forEach(task => {
        task.userId = task.userId === user ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      console.log('');
    }
  },
  fixTasksStructure: () => {}
};

// init DB
(() => {
  for (let i = 0; i < 3; i++) {
    db.Users.push(new User());
  }
})();

const getAllEntities = tableName => {
  return db[tableName];
};

const getEntity = (tableName, id) => {
  const entities = db[tableName].filter(entity => entity.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}. Entity ID: ${id}`
    );
    throw Error('The DB data is wrong!');
  }

  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    db[`fix${tableName}Structure`](entity);
    const index = db[tableName].indexOf(entity);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
  }

  return entity;
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);

  return getEntity(tableName, entity.id);
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  }

  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};
