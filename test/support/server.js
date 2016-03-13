import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve(__dirname, '../fixtures')));

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

app.get('/401', (req, res) => {
  res.status(401).send({ errors: ['unauthorized req'] });
});

export default app;
