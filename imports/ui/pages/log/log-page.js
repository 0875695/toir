import './log-page.html';

Template.logPage.onCreated(function(){
    this.selectedDate = new ReactiveVar(moment().format('YYYY-MM-DD'));
})

Template.logPage.helpers({
  getLinks(){
    return [
      {label:'Главная', url: FlowRouter.path('App.home')},
      {label:'Журнал'}
    ];
  },
  getDate(){
      return moment().format('YYYY-MM-DD');
  },
  getSelectedDate(){
    return Template.instance().selectedDate;
  }
});

Template.logPage.events({
  'change #filterDate'(o, t){
    t.selectedDate.set(moment(o.target.value).format('YYYY-MM-DD'));
  }
});
