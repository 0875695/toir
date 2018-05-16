import './users-update-form-com.html';
import {usersUpdateFormSchema} from '/imports/api/users/users-update-form-schema.js';

Template.usersUpdateFormCom.onCreated(function () {
   this.subscribe('users.one', this.data.userId);
});

Template.usersUpdateFormCom.helpers({
   getUserId() {
      return this.userId;
   },
   getUser() {
      let user = Meteor.users.findOne(this.userId);
      if (user) {
         return {
            _id: user._id,
            name: user.profile.name,
            email: user.emails[0].address,
            password: '',
            confirmPassword: '',
            roles: user.roles && user.roles.toir ? user.roles.toir : []
         }
      } else {
         return {
            _id: '',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            roles: []
         }
      }
   },
   getUsersUpdateFormSchema() {
      return usersUpdateFormSchema;
   },
   getSubmitButtonText() {
      return TAPi18n.__('Save');
   }
});

Template.usersUpdateFormCom.onRendered(function () {
  var usersUpdateFormHooks = {
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      toastr['success'](TAPi18n.__('User data was updated successfully'), TAPi18n.__('Success'));
      if(Meteor.userId() == this.insertDoc._id && this.insertDoc.password){
        setTimeout(function(){FlowRouter.reload()}, 1000);
        FlowRouter.go('App.login');
      }
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
      if (error.reason) {
        toastr['error'](TAPi18n.__(error.reason), TAPi18n.__('Error'));
      } else {
        toastr['error'](error, TAPi18n.__('Error'));
      }
    },
  };

  AutoForm.addHooks('usersUpdateForm', usersUpdateFormHooks, true);
});
