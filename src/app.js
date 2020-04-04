const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const notFoundError = require('./errors/appError');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof notFoundError) {
    res.status(err.status).send(err.message);
  } else if (err) {
    res.sendStatus(500);
  }
  next();
});

module.exports = app;
