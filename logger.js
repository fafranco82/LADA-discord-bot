const winston = require('winston');
const format = winston.format;

const logger = winston.createLogger({
    format: format.combine(
        format.cli()
    ),
    transports: [
        new winston.transports.Console({level: 'debug'})
    ]
});

module.exports = logger;