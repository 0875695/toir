import './users-list-com.html';

Template.usersListCom.onCreated(function () {
   this.subscribe('users.all');
});

Template.usersListCom.helpers({
   users() {
      return Meteor.users.find();
   },
   getEmail() {
      if (this.emails && this.emails[0]) {
         return this.emails[0].address;
      } else {
         return '';
      }
   },
   getRolesText() {
      if (this.roles && this.roles.toir.length > 0) {
         return this.roles.toir.map(function (role) {
            return TAPi18n.__(role);
         }).join(',');
      } else {
         return '';
      }
   }
});
