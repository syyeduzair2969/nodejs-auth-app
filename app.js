const express = require('express');
const routes = require('./Routes/emp_routes');
const authRouter = require('./Routes/authRouter');
const CustomError = require('./Utils/CustomError');
const globalErrorHandler = require('./Controllers/errorController');
const hr = require('./Routes/hrRouter');
const admin = require('./Routes/adminRoutes');


// const errroMiddelware=require('./Middlerwares/errorMiddleware');
const morgan=require("morgan");
let app = express();


app.use(express.json());
app.use(morgan("dev"));
//app.use(express.static('./public'))
app.use('/api/v1/expenses', routes);
app.use('/api/v1/users', authRouter);
 app.use('/api/v1/hr', hr);
 app.use('/api/v1/admin', admin);

app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Can't find ${req.originalUrl} on the server!`
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    // err.status = 'fail';
    // err.statusCode = 404;
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});
app.use(globalErrorHandler);

//validation middelware
//app.use(errroMiddelware);
module.exports = app;