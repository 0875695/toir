import {usersAddFormSchema} from '../users-add-form-schema.js';

Meteor.methods({
   'users.add' (data) {
      usersAddFormSchema.validate(data);

      let loggedInUser = Meteor.user();
      if (!loggedInUser ||
         !Roles.userIsInRole(loggedInUser, ['admin'], 'toir-group')) {
         throw new Meteor.Error(403, 'Access denied');
      }
      if (Meteor.users.findOne({
            'emails.address': data.email
         })) {
         throw new Meteor.Error(500, 'That email address already registered');
      }

      var id;

      id = Accounts.createUser({
         email: data.email,
         password: data.password,
         profile: {
            name: data.name
         }
      });

      if (data.roles.length > 0) {
         Roles.addUsersToRoles(id, data.roles, 'toir-group');
      }
   }
});
