import express from 'express';

const app = express();

app.get('/ping', (req, res) => {
  res.sendStatus(200);
});

if (!module.parent) {
  app.listen(process.env.PORT || 4000);
}

export default app;
