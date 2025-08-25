const express = require('express')
const bodyParser = require('body-parser')
const taskRoutes = require('./routes/taskRoutes')
const path = require('path')
const flash = require('connect-flash')
const sessionConfig = require('./config/sessionConfig')

const app = express()

app.use(bodyParser.json())// ou express.urlencoded
app.use(sessionConfig)
app.use(flash())
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/tasks', taskRoutes)


module.exports = app