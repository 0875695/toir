import './users-add-form-com.html';
import {
   usersAddFormSchema
} from '/imports/api/users/users-add-form-schema.js';

Template.usersAddFormCom.helpers({
   getUsersAddFormSchema() {
      return usersAddFormSchema;
   },
   getSubmitButtonText() {
      return TAPi18n.__('Submit');
   }
});

Template.usersAddFormCom.onRendered(function () {
  var usersAddFormHooks = {
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      toastr['success'](TAPi18n.__('User was created successfully'), TAPi18n.__('Success'));
      FlowRouter.go('App.users.list');
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

  AutoForm.addHooks('usersAddForm', usersAddFormHooks, true);
});
