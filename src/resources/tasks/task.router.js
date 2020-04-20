const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { taskId } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const boards = await taskService.getAll(req.params.boardId);
  await res.status(OK).json(boards.map(t => t.toResponse));
});

router.get('/:id', validator(taskId, 'params'), async (req, res) => {
  const board = await taskService.get(req.params.boardId, req.params.id);
  res.status(OK).send(board);
});

router.delete('/:id', validator(taskId, 'params'), async (req, res) => {
  await taskService.remove(req.params.boardId, req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.route('/').post(async (req, res) => {
  const board = await taskService.save({
    ...req.body,
    boardId: req.params.boardId
  });
  res.status(OK).send(board);
});

router.put('/:id', validator(taskId, 'params'), async (req, res) => {
  const board = await taskService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.status(OK).send(board);
});

module.exports = router;
