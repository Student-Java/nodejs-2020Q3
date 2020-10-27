const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const userService = require('./user.service');
const { id, user } = require('../../utils/validation/sсhemas');
const validator = require('../../utils/validation/validator');

router.get('/', async (req, res) => {
  const users = await userService.getAll();
  await res.status(OK).json(users.map(u => u.toResponse()));
});

router.get('/:id', validator(id, 'params'), async (req, res) => {
  const userEntity = await userService.get(req.params.id);
  res.status(OK).send(userEntity.toResponse());
});

router.delete('/:id', validator(id, 'params'), async (req, res) => {
  await userService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

router.post('/', validator(user, 'body'), async (req, res) => {
  const userEntity = await userService.save(req.body);
  res.status(OK).send(userEntity.toResponse());
});

router.put(
  '/:id',
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.params.id, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

module.exports = router;
