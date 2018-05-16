import { Logger }      from 'meteor/ostrio:logger';
import { LoggerMongo } from 'meteor/ostrio:loggermongo';

// Initialize Logger:
export const log = new Logger();

// Initialize and enable LoggerMongo with default settings:
(new LoggerMongo(log)).enable();
