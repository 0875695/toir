import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const AlarmLog = new Mongo.Collection('alarmlog');

export const AlarmLogSchema = new SimpleSchema({
  date:{
    type: Date,
    label: () => {return TAPi18n.__('Date')},
    autoform:{
      type: 'date',
      value: moment().format('YYYY-MM-DD')
    }
  },
  equipment:{
    type: String,
    label: () => {return TAPi18n.__('Equipment')}
  },
  service:{
    type: String,
    label: () => {return TAPi18n.__('Service')},
    autoform: {
      type: 'select',
      options: function(){
        return[
        {
          label: TAPi18n.__('mechanical'),
          value: 'mechanical'
        },
        {
          label: TAPi18n.__('electrical'),
          value: 'electrical'
        },
        {
          label: TAPi18n.__('energy'),
          value: 'energy'
        },
        {
          label: TAPi18n.__('technological'),
          value: 'technological'
        }
      ]},
      firstOption: ''
    }
  },
  downtime:{
    type: String,
    label: () => {return TAPi18n.__("DownTime")}
  },
  cause: {
    type: String,
    label: () => {return TAPi18n.__("Cause")}
  }
}, {tracker: Tracker});

AlarmLog.attachSchema(AlarmLogSchema);
