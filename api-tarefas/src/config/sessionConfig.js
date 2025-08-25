const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const sessionConfig = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DB_ACESS }),
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000*60*60*24*3, // 3 dias
        httpOnly: true
    } 
})

module.exports = sessionConfig;