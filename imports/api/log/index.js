import { Logger } from 'meteor/ostrio:logger';
import { LoggerMongo } from 'meteor/ostrio:loggermongo';

export  const ToirLog = new Mongo.Collection('toirLog');
export const log = new Logger();

(new LoggerMongo(log, {collection: ToirLog})).enable();
