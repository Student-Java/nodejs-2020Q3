const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  wrapAsync(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  wrapAsync(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const user = await usersService.save(req.body);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  wrapAsync(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse(user));
  })
);

function wrapAsync(fn) {
  return (req, res, next) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
}

module.exports = router;
