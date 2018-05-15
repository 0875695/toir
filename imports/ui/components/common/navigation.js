import './navigation.html';


Template.navigation.rendered = function(){
  // Initialize metisMenu
  $('#side-menu').metisMenu();
};

// Used only on OffCanvas layout
Template.navigation.events({
  'click .close-canvas-menu' : function(){
      $('body').toggleClass("mini-navbar");
  },
  'click .mnu-logout': function(e) {
    console.log(e);
    Meteor.logout(function() {
      FlowRouter.go('App.login');
    });
  }
});
