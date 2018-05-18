import './alarmlog-list.html';

Template.alarmLogList.helpers({
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Журнал'}
    ];
  }
});
