import './login.html';

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
        console.log(err.reason)
      }else{
        FlowRouter.go('App.home');
        console.log('success')
      }
    })
  }
})
