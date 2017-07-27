import Ember from 'ember';
import moment from 'moment';

const { HTMLBars } = Ember;

export function momentJs(date) {
  return moment(date[0]).format(date[1]);
}

export default HTMLBars.makeBoundHelper(momentJs);
