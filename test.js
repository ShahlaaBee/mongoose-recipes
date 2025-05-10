const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();
const db = require('./db');
const PORT = process.env.PORT? process.env.PORT: 3000;
const app = express();
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const recipeRouter = require('./routes/recipeRouter.js');
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/recipes', recipeRouter);
// Set up the base route
app.get('/', (req, res) => {
    res.render('index.ejs')
});
// Listen on PORT
app.listen(PORT, () => {
    console.log(`Running Server on Port ${PORT} ...`);
});