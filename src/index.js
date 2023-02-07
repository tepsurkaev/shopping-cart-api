import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const app = express();

const { PORT = 3030, DB_URI = '' } = process.env;

app.use(express.json());
app.use(cors());

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
