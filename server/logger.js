const winston = require('winston')
const env = process.env.NODE_ENV || 'development'

class Logger {
  constructor() {
    this.transports = []
    if (env == 'production' || env == 'staging') {
      console.log(`setup logger to write to file - /usr/app/log/${env}.log`)
      this.transports = [
        new winston.transports.File({
          filename: `/usr/app/log/${env}.log`,
          level: 'info'
        }),
        new winston.transports.File({
          filename: `/usr/app/log/${env}-error.log`,
          level: 'error'
        }),
        new winston.transports.Console({
          level: 'silly'
        })
      ]
    } else if (env == 'test') {
      this.transports = [
        new winston.transports.Console({
          level: 'error'
        })
      ]
    } else {
      this.transports = [
        new winston.transports.Console({
          level: 'silly'
        })
      ]
    }
    this.winstonLogger = winston.createLogger({
      transports: this.transports
    })
  }

  log(message) {
    this.winstonLogger.log({ level: 'info', message })
  }
}

module.exports = new Logger()
