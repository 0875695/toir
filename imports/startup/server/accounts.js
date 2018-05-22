if(Meteor.users.find().count() !== 0) {

  Accounts.validateNewUser(function (user) {

    let loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
      return true;
    }
      throw new Meteor.Error(403, "Not authorized to create new users");

    });
}
