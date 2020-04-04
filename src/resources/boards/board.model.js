const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'USER', columns = 'user' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
