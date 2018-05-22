Meteor.startup(() => {
   var users = [{ name: 'Admin User', email: 'admin@example.com', roles: ['admin']}];

   _.each(users, function (user) {

      if (Meteor.users.findOne({'emails.address': user.email})) {
         return ;
      }
      var id;

         id = Accounts.createUser({
         email: user.email,
         password: 'Init123$',
         profile: {
            name: user.name
         }
      });

      if (user.roles.length > 0) {
         Roles.addUsersToRoles(id, user.roles, 'toir');
      }

   });
});
