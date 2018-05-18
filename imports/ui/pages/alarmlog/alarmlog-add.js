import './alarmlog-add.html';

Template.alarmLogAdd.helpers({
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Список простоев', url: FlowRouter.path('App.alarmlog.list')},
      {label:'Добавить'}
    ];
  }
})
