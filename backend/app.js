const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login, signOut } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateSignUp, validateSignIn } = require('./middlewares/validators');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(
  cors({
    origin: [
      'http://localhost:3010',
      'https://localhost:3010',
      'http://api.mestoproject.kiro.nomorepartiesxyz.ru',
      'https://api.mestoproject.kiro.nomorepartiesxyz.ru',
      'https://github.com/kromnik',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateSignUp, createUser);
app.post('/signin', validateSignIn, login);

app.use(auth);

app.get('/signout', signOut);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
