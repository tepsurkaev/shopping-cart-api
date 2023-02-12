require('dotenv/config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');

mongoose.set('strictQuery', true);

const app = express();

const { PORT = 3030, DB_URI = '' } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(indexRouter);
app.use(errorMiddleware);

(async function () {
  try {
    await mongoose.connect(DB_URI);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Успешное соединение: Порт ${PORT}`);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Ошибка при подключении: ${e}`);
  }
})();
