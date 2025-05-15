const express = require('express')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()
const db = require('./db')
const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const recipeRouter = require('./routes/recipeRouter.js')


const app = express()
app.use(express.static('public'))
//check
app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/recipes', recipeRouter)
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next()
})

const PORT = process.env.PORT ? process.env.PORT : 3000

app.get('/', (req, res) => {
  res.render('index.ejs')
})



app.listen(3000, () => {
  console.log(`Running server on ${PORT}`)
})