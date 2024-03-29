const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require(`./routes/tourRoutes`);
const userRouter = require(`./routes/userRoutes`);
const reviewRouter = require(`./routes/reviewRoutes`);
const viewRouter = require(`./routes/viewRoutes`);

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(
  // helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false })
  helmet()
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan(`dev`));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, please try again in hours',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// Data sanitization against NOSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(
  hpp({
    whitelist: ['duration', 'ratingsQuality', 'price', 'maxGroupSize'],
  })
);

app.use((req, res, next) => {
  console.log(`Hello From Middleware`);
  req.requestTime = new Date().toISOString();
  console.log(req.cookieParser);
  next();
});
// const email = document.getElementById('email');
// console.log(email);
// const password = document.getElementById('password')?.value;
// console.log(password);

app.use(`/`, viewRouter);
app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/reviews`, reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
