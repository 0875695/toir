import {usersAddFormSchema} from '../users-add-form-schema.js';
import {usersUpdateFormSchema} from '../users-update-form-schema.js';

Meteor.methods({
   'users.add' (data) {
      usersAddFormSchema.validate(data);

      let loggedInUser = Meteor.user();
      if (!loggedInUser ||
         !Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
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
         Roles.addUsersToRoles(id, data.roles, 'toir');
      }
   },
   'users.update' (data) {
      usersUpdateFormSchema.validate(data);

      let loggedInUser = Meteor.user();
      if (!loggedInUser ||
         !Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
         throw new Meteor.Error(403, 'Access denied');
      };
      console.log(data);
      Meteor.users.update(data._id, {$set: {'profile.name': data.name}});
      if(data.password && data.confirmPassword && data.password === data.confirmPassword){
          Accounts.setPassword(data._id, data.password);
      };
      Meteor.users.update(data._id, {$unset: {'roles': ''}});
      if (data.roles.length > 0) {
         Roles.addUsersToRoles(data._id, data.roles, 'toir');
      };
   }
});
