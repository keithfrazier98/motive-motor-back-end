const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express")
const cors = require('cors')

const app = express()

const loginsRouter = require('./login/login.router');
const testRouter = require('./testConnection/testConnection.router')
const profilesRouter = require('./profiles/profiles.router')
const notFound = require("./db/error/notFound");
const errorHandler = require("./db/error/errorHandler");

app.use(cors())
app.use(express.json())

app.use('/test', testRouter)
app.use('/logins', loginsRouter)
app.use('/profiles', profilesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app