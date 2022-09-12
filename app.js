const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const { DATABASE_URL, PORT } = require('./utils/config');

const app = express();

app.use(cors());

app.use(requestLogger);
app.use(helmet());
app.use(limiter);

// const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(error);

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to DB'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
