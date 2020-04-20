const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const boardService = require('./task.service');
const { taskId } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll(req.params.boardId);
  await res.status(OK).json(boards);
});

router.get('/:id', validator(taskId, 'params'), async (req, res) => {
  const board = await boardService.get(req.params.boardId, req.params.id);
  res.status(OK).send(board);
});

router.delete('/:id', validator(taskId, 'params'), async (req, res) => {
  await boardService.remove(req.params.boardId, req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.route('/').post(async (req, res) => {
  const board = await boardService.save(
    Task.fromRequest({ ...req.body, boardId: req.params.boardId })
  );
  res.status(OK).send(board);
});

router.put('/:id', validator(taskId, 'params'), async (req, res) => {
  const board = await boardService.update(
    Task.fromRequest({
      ...req.body,
      id: req.params.id,
      boardId: req.params.boardId
    })
  );
  res.status(OK).send(board);
});

module.exports = router;
