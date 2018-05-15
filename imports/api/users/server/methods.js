import {
   usersAddFormSchema
} from '../users-add-form-schema.js';

Meteor.methods({
   'users.add' (data) {
      console.log(data);

      usersAddFormSchema.validate(data);
      //throw new Meteor.Error(403, "Access denied");

   //    if (Meteor.users.findOne({
   //          'emails.address': user.email
   //       })) {
   //       return;
   //    }
   //
   //    var id;
   //
   //    id = Accounts.createUser({
   //       email: user.email,
   //       password: 'Init123$',
   //       profile: {
   //          name: user.name
   //       }
   //    });
   //
   //    if (user.roles.length > 0) {
   //       // Need _id of existing user record so this call must come
   //       // after `Accounts.createUser` or `Accounts.onCreate`
   //       Roles.addUsersToRoles(id, user.roles, 'admin-group');
   //    }
   }
});
