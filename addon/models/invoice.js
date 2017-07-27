import Model from './model';
import DS from 'ember-data';
import Ember from 'ember';
const { attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  /* Properties */
  identifier: attr(),
  received: attr('boolean'),
  status: attr('string', { defaultValue: 'draft' }),
  isPaid: attr('boolean'),
  issued: attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  due: attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
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