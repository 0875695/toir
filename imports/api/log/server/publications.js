import { ToirLog } from '../index.js';
import { moment } from 'meteor/momentjs:moment';

Meteor.publish('log.messages', function (date) {
  let cursor = ToirLog.find({
    $and: [
      {date: {$gt: moment.utc(date).startOf('day').toDate()}},
      {date: {$lt: moment.utc(date).startOf('day').add(1, 'days').toDate()}}
    ]
  });
  let userIds = [];
  cursor.map(function(message) {
    userIds.push(message.userId);
  });
  return [cursor, Meteor.users.find({_id: {$in: userIds}})];
});
