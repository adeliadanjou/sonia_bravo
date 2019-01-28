const winston = require('winston');

let logger = winston.createLogger({

    //los levels se pueden quitar porque vienen por defecto, los dejo solo para referencia:
  levels: {
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5 
},
  format: winston.format.combine(winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(info => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
      })
  ),
  transports: [new winston.transports.Console()]
});

module.exports = logger;