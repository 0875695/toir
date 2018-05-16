import './users-update.html';

Template.usersUpdate.helpers({
  getUserId(){
    return FlowRouter.getParam('uId');
  },
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Пользователи', url: FlowRouter.path('App.users.list')},
      {label:'Редактировать'}
    ];
  }
})
