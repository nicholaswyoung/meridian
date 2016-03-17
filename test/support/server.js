import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

if (process.env.DEBUG) {
  app.use(logger('combined'));
}
app.use(express.static(path.resolve(__dirname, '../fixtures')));
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

app.get('/401', (req, res) => {
  res.status(401).send({ errors: ['unauthorized req'] });
});

app.post('/products', (req, res) => {
  res.send({ data: req.body, meta: { method: 'post' } });
});

app.patch('/products/:id', (req, res) => {
  res.send({ meta: { method: 'patch' } });
});

app.delete('/products/:id', (req, res) => {
  res.send({ meta: { method: 'delete' } });
});

app.get('/query', (req, res) => {
  res.send({ meta: { query: req.query || {} } });
});

export default app;
