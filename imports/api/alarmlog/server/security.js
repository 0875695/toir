import {AlarmLog} from '../index.js';

AlarmLog.allow({
  insert() { return true; }
});
