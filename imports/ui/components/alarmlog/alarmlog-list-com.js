import './alarmlog-list-com.html';
import { AlarmLog } from '../../../../imports/api/alarmlog';

Template.alarmLogListCom.onCreated(function () {

   this.subscribe('alarms.all');

});

Template.alarmLogListCom.rendered = function(){

  setTimeout(() => {
    $('#dataTables').DataTable({
      dom: '<"html5buttons"B>lTfgitp',
      buttons: [
        {extend: 'copy'},
        // {extend: 'csv'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile'},
        {extend: 'print',
            customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                    .addClass('compact')
                    .css('font-size', 'inherit');
            }
        }
      ]
    });
  }, 50);
};

Template.alarmLogListCom.helpers({
  getAlarmLog() {
    return AlarmLog.find();
  },
  dateFormat(date) {
     return moment(date).format('DD-MM-YYYY');
  },
  ready() {
    return Template.instance().subscriptionsReady();
  }
});
