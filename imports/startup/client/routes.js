import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/blank/blank.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/login/login.js';

let allUsers = FlowRouter.group({});
let managerUsers = FlowRouter.group({
  triggersEnter: [function(context, redirect) {
    if(!Meteor.loggingIn() && !Meteor.userId()){
      redirect('/login');
    }
  }]
});
let adminUsers = FlowRouter.group({});

// Set up all routes in the app
managerUsers.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { content: 'App_home' });
  },
});

allUsers.route('/login', {
    name: 'App.login',
    action: function() {
        BlazeLayout.render("blankLayout", {content: "login"});
    }
});

allUsers.notFound = {
  action() {
    BlazeLayout.render('App_body', { content: 'App_notFound' });
  },
};
