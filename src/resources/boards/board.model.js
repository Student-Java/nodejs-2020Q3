const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'TITLE', columns = 'TODO' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static fromRequest(body) {
    return new Board(body);
  }
}

module.exports = Board;
