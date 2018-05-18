import {AlarmLog} from '../index.js';

Meteor.publish('alarms.all', function () {
  return AlarmLog.find();
});
