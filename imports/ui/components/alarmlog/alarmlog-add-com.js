import './alarmlog-add-com.html';
import {AlarmLog} from '/imports/api/alarmlog';

Template.alarmLogAddCom.helpers({
  getAlarmLog(){
    return AlarmLog;
  },
  getSubmitButtonText() {
     return TAPi18n.__('Submit');
  }
});

Template.alarmLogAddCom.onRendered(function () {
  var alarmlogAddFormHooks = {
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      toastr['success'](TAPi18n.__('User alarm created successfully'), TAPi18n.__('Success'));
      FlowRouter.go('App.alarmlog.list');
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

  AutoForm.addHooks('alarmlogAddForm', alarmlogAddFormHooks, true);
});
