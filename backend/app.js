// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

require('dotenv').config();

// Массив доменов, с которых разрешены кросс-доменные запросы
// const options = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost:3001',
//     'http://127.0.0.1:3000',
//     'https://domainpracticum.nomoredomainsicu.ru',
//     'http://domainpracticum.nomoredomainsicu.ru',
//     'http://api.domainname.students.nomoredomainsicu.ru',
//     'https://api.domainname.students.nomoredomainsicu.ru',
//   ],
//   credentials: true, // позволяет устанавливать куки
// };

const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
app.use(cors());

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок
//   // Проверяем, что значение origin есть среди разрешённых доменов
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   // Значение для заголовка Access-Control-Allow-Methods по умолчанию разрешены все типы запросов
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   // Если это предварительный запрос, добавляем нужные заголовки
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//   }
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }
//   return next();
// });

app.use(express.json());
app.use(helmet());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // наш централизованный обработчик

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
