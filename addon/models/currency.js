import Ember from 'ember';
import Model from './model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  entity: attr(),
  currency: attr(),
  name: attr(),
  symbol: attr(),

  label: computed('name', 'currency', function() {
    return `${this.get('currency')} - ${this.get('name')}`;
  })
});
