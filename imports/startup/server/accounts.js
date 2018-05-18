if(Meteor.users.find().length > 0) {

  Accounts.validateNewUser(function (user) {

    console.log(user);
    let loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
      return true;
    }
      throw new Meteor.Error(403, "Not authorized to create new users");

    });
}
