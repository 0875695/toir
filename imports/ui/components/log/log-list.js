import './log-list.html';

import { ToirLog } from '../../../../imports/api/log';


Template.logList.onCreated(function () {  
   let instance = this;
   this.autorun(function () {
      if (instance.data.date) {
         instance.subscribe('log.messages', instance.data.date.get());
      }
   });
});

Template.logList.helpers({
   getLogMessages() {
      return ToirLog.find();
   },
   isEqual(level1, level2) {
      return level1 === level2;
   },
   dateFormat(date) {
      return moment(date).format('YYYY-MM-DD HH:mm');
   },
   getItemListClass(level) {
      if (level === 'WARN')
         return 'warning-element';
      if (level === 'ERROR')
         return 'danger-element';
      return 'info-element';
   },
   getUserInfo() {
      let userId = this.userId;
      let user = Meteor.users.findOne(userId);
      let userInfo = '';
      if (user && user.profile.name) {
         userInfo += user.profile.name;

      }
      if (user && user.emails[0].address) {
         userInfo += ' (' + user.emails[0].address + ')';
      }
      return userInfo;
   }
});
