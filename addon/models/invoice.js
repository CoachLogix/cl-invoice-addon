import Model from './model';
import DS from 'ember-data';
import Ember from 'ember';
const { attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  /* Properties */
  payee: belongsTo('model', {
    polymorphic: true,
    async: true,
    inverse: null
  }),
  currency: belongsTo('currency', {
    async: true,
    inverse: null
  }),
  total: attr('money', { defaultValue: 0 }),

  totalInCents: computed('total', function() {
    return this.get('total') * 100;
  })
});