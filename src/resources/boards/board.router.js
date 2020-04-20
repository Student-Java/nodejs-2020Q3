const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const boardService = require('./board.service');
const { id } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll();
  console.log(JSON.stringify(boards));
  await res.status(OK).json(boards.map(b => b.toResponse()));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const board = await boardService.get(req.params.id);
  res.status(OK).send(board.toResponse());
});

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await boardService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.save(req.body);
  res.status(OK).send(board.toResponse());
});

router.put('/:id', validator(id, 'params'), async (req, res) => {
  const board = await boardService.update(req.params.id, req.body);
  res.status(OK).send(board.toResponse());
});

module.exports = router;
