const { OK, CREATED, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardService.getAll();
    await res.status(OK).json(boards);
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const board = await boardService.get(req.params.id);
    res.status(OK).send(board);
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardService.save(Board.fromRequest(req.body));
    res.status(CREATED).send(board);
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const board = await boardService.update(
      Board.fromRequest({ ...req.body, id: req.params.id })
    );
    res.status(CREATED).send(board);
  })
);

module.exports = router;
