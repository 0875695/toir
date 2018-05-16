Meteor.publish('users.all', function () {
  let loggedInUser = Meteor.users.findOne(this.userId);
  if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
     return [];
  }
  return Meteor.users.find();
});

Meteor.publish('users.one', function (uId) {
  let loggedInUser = Meteor.users.findOne(this.userId);
  if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {

    return [];
  }
  return Meteor.users.find({_id: uId});
});
