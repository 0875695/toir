
import '../../ui/layouts/body/body.js';
import '../../ui/layouts/blank/blank.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/login/login.js';
import '../../ui/pages/users/users-add.js';
import '../../ui/pages/users/users-list.js';
import '../../ui/pages/users/users-update.js';
import '../../ui/pages/log/log-page.js';
import '../../ui/pages/alarmlog/alarmlog-add.js';
import '../../ui/pages/alarmlog/alarmlog-list.js';

FlowRouter.wait();

let allUsers = FlowRouter.group({});

let managerUsers = FlowRouter.group({
   triggersEnter: [function (context, redirect) {
      if (!Meteor.loggingIn() && !Meteor.userId()) {
         redirect('/login');
      }
   }]
});

let adminUsers = FlowRouter.group({
    triggersEnter: [function (context, redirect) {
       if (!Meteor.loggingIn() && !Meteor.userId()) {
          redirect('/login');
       } else {
          let loggedInUser = Meteor.user();

          if (!loggedInUser ||
             !Roles.userIsInRole(loggedInUser, ['admin'], 'toir')) {
             redirect('/App_notFound')
          }
       }
    }]
 });
// Set up all routes in the app
managerUsers.route('/', {
   name: 'App.home',
   action() {
      BlazeLayout.render('App_body', {
         content: 'App_home'
      });
   },
});

managerUsers.route('/alarmlog/add', {
   name: 'App.alarmlog.add',
   action() {
      BlazeLayout.render('App_body', {
         content: 'alarmLogAdd'
      });
   },
});

managerUsers.route('/alarmlog/list', {
   name: 'App.alarmlog.list',
   action() {
      BlazeLayout.render('App_body', {
         content: 'alarmLogList'
      });
   },
});

allUsers.route('/login', {
   name: 'App.login',
   action: function () {
      BlazeLayout.render("blankLayout", {
         content: "login"
      });
   }
});

FlowRouter.notFound = {
   action() {
      BlazeLayout.render('App_body', {
         content: 'App_notFound'
      });
   }
};

adminUsers.route('/users/list', {
   name: 'App.users.list',
   action: function () {
      BlazeLayout.render("App_body", {
         content: "usersList"
      });
   }
});

adminUsers.route('/users/add', {
   name: 'App.users.add',
   action: function () {
      BlazeLayout.render("App_body", {
         content: "usersAdd"
      });
   }
});

adminUsers.route('/users/update/:uId', {
   name: 'App.users.update',
   action: function () {
      BlazeLayout.render("App_body", {
         content: "usersUpdate"
      });
   }
});

adminUsers.route('/log', {
   name: 'App.log',
   action: function () {
      BlazeLayout.render("App_body", {
         content: "logPage"
      });
   }
});

Tracker.autorun(function(){
    if(Roles.subscription.ready() && !FlowRouter._initialized){
          FlowRouter.initialize();
    }
});
