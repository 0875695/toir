import {usersAddFormSchema} from '../users-add-form-schema.js';
import {usersUpdateFormSchema} from '../users-update-form-schema.js';
import {log} from '../../log';

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

      let RolesText = '';

      if (data.roles && data.roles.length > 0) {
         Roles.addUsersToRoles(id, data.roles, 'toir');
         RolesText = ', пользователю назначены роли ' + data.roles.join(', ');
      }

      log.info('Добавлен пользователь' + data.name + ' (' + data.email + ')' + RolesText, {type: 'users'}, this.userId);
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
      log.info('Для пользователя ' + data._id + ' изменено имя на ' + data.name,  {type: 'users'}, this.userId);

      if(data.password && data.confirmPassword && data.password === data.confirmPassword){
          Accounts.setPassword(data._id, data.password);
          log.info('Для пользователя ' + data._id + ' изменен пароль',  {type: 'users'}, this.userId);
      };

      Meteor.users.update(data._id, {$unset: {'roles': ''}});
      if (data.roles && data.roles.length > 0) {
         Roles.addUsersToRoles(data._id, data.roles, 'toir');
         log.info('Для пользователя ' + data._id + ' установлены роли ' + data.roles.join(', '),  {type: 'users'}, this.userId);
      };
   }
});
