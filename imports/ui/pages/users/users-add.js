import './users-add.html';

Template.usersAdd.helpers({
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Пользователи', url: FlowRouter.path('App.users.list')},
      {label:'Добавить'}
    ];
  }
})
