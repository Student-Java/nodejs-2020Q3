const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router();
const User = require('./user.model');
const userService = require('./user.service');
const wrapAsync = require('../../utils/wrapAsync');
const { id, user } = require('../../utils/validation/shemas');
const validator = require('../../utils/validation/validator');

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const users = await userService.getAll();
    await res.status(OK).json(users.map(User.toResponse));
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(User.toResponse(userEntity));
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  wrapAsync(async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

router.post(
  '/',
  validator(user, 'body'),
  wrapAsync(async (req, res) => {
    const userEntity = await userService.save(User.fromRequest(req.body));
    res.status(OK).send(User.toResponse(userEntity));
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  validator(user, 'body'),
  wrapAsync(async (req, res) => {
    const userEntity = await userService.update(
      req.params.id,
      User.fromRequest(req.body)
    );
    res.status(OK).send(User.toResponse(userEntity));
  })
);

module.exports = router;
