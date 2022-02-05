/* eslint-disable no-console */
import createError, { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import indexRouter from './routes/index';
import {connectDB, connectTestDB} from './database/mongoConnect'
import cors from 'cors';

import indexRoute from './routes/index';
import authRoute from './routes/auth';
import jobsRoute from './routes/jobs';
import usersRoute from './routes/users';
import applicationsRoute from './routes/application';
import adminRoutes from './routes/admin';

/* GET home page. */
// router.get('/', (req: Request, res: Response) => {
//   res.send('JobFinder server is live');
// });


dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../', 'public')));
// view engine setup
app.set('views', path.join(__dirname, '../', 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'test') {
  connectTestDB();
} else {
  connectDB();
}
console.log(process.env.NODE_ENV);

app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/jobs', jobsRoute);
app.use('/users', usersRoute);
app.use('/applications', applicationsRoute)
app.use('/admin', adminRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
