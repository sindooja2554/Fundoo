var winston = require('winston');
// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: 'info',
    filename: `./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// // instantiate a new Winston Logger with the settings defined above
// let logger = winston.createLogger({
//     transports: [
//         new winston.transports.File(options.file),
//       new winston.transports.Console(options.console)
//     ],
//     exitOnError: false, // do not exit on handled exceptions
//   });

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

module.exports = logger;