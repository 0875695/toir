import './login.html';
import {log} from '/imports/api/log';

Template.login.onCreated(function(){
  if(Meteor.loggingIn() || Meteor.userId()){
    FlowRouter.go('App.home');
  }
})

Template.login.events({
  'click #btnLogin': function(e){
    let login = $('#fldLogin').val();
    let password = $('#fldPassword').val();
    Meteor.loginWithPassword(login, password, function(err){
      if(err){
        toastr['error'](TAPi18n.__(err.reason), TAPi18n.__('Authentication error'))
        log.error('[' + login + ',' + password + '] - ' + TAPi18n.__(err.reason));
      }else{
        log.info('Пользователь вошёл в систему.')
        FlowRouter.go('App.home');
      }
    })
  }
})
