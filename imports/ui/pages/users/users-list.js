import './users-list.html';

Template.usersList.helpers({
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Пользователи'}
    ];
  }
})
