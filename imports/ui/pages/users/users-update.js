import './users-update.html';

Template.usersUpdate.helpers({
  getUserId(){
    return FlowRouter.getParam('uId');
  }
})
