const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('combined'));
app.use(express.static('public'));
app.use(express.static('../test/fixtures'));

app.listen(process.env.PORT || 4000);

process.stdout.write(
  `Meridian example now listening on ${process.env.PORT || 4000}`
);
