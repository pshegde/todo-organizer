'use strict'
const express = require('express')
const app = express()

// const db = require('./models')
const logger = require('./logger')
// const models = db.models
// global.models = models
let router = require('./router')
const moment = require('moment')
const uuid = require('uuid')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
// app.set('models', models)
app.set('logger', logger)

app.use((req, res, next) => {
  let uid = uuid.v1()
  let start = moment()
  logger.log({
    message: `Request # ${uid} - ${req.method.toUpperCase()} ${req.path} called with ${JSON.stringify(req.query, null, 2)} and body ${JSON.stringify(req.body, null, 2)}`,
    level: 'info'
  })
  res.on('finish', () => {
    logger.log(
      {
        message: `Request  # ${uid} - ${req.method.toUpperCase()} ${req.path} took ${moment().diff(start, 'seconds')} s`,
        reqId: uid,
        level: 'info'
      }
    )
  })
  next()
})

app.use('/', router)

app.use((err, req, res, next) => {
  logger.log({ message: err.stack || err.message || err, level: 'error' })
  res.status(500).send({
    error: {
      message: err.message || err,
      details: err.stack || err.message || err
    }
  })
})
let server = app.listen(3000, () => {
  console.log('server started')
})

process.on('SIGINT', clean)
process.on('SIGTERM', clean)

function clean() {
  server.close(() => {
    // db.connection.close()
  })
}

module.exports = app
