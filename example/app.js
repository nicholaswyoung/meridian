const express = require('express');
const logger = require('morgan');
const app = express();

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
  app.use(logger('combined'));
}

app.use(express.static('public'));
app.use(express.static('../test/fixtures'));

app.get('/401', (req, res) => {
  res.status(401).send({ errors: ['unauthorized req'] });
});

export default app;
