import Model from './model';
import Ember from 'ember';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

const { computed } = Ember;

export default Model.extend({
  sortProperties: ['date:desc'],

  identifier: attr(),
  payerAddressOne: attr(),
  payerAddressTwo: attr(),
  subtotal: attr('money', { defaultValue: 0 }),
  taxableAmount: attr('money', { defaultValue: 0 }),
  vatRate: attr(),
  taxes: attr('money', { defaultValue: 0 }),
  total: attr('money', { defaultValue: 0 }),
  costCode: attr('string', { defaultValue: '' }),
  status: attr('string', { defaultValue: 'draft' }),
  payerContact: attr(),
  notes: attr(),

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

  transactions: hasMany('billingTransaction', {
    key: 'transactions',
    async: true,
    inverse: null
  }),

  customTransactions: computed.filterBy('transactions', 'isCustom', true),
  systemTransactions: computed.filterBy('transactions', 'isCustom', false),
  sortedSystemTransactions: computed.sort('systemTransactions', 'sortProperties'),
  taxableTransactions: computed.filterBy('transactions', 'isTaxable', true),

  payer: belongsTo('model', {
    polymorphic: true,
    async: true,
    inverse: null
  }),
  payee: belongsTo('model', {
    polymorphic: true,
    async: true,
    inverse: null
  }),
  taxApproach: belongsTo('taxApproach', {
    async: true,
    inverse: null
  }),
  currency: belongsTo('currency', {
    async: true,
    inverse: null
  }),
  relatedEngagement: belongsTo('engagement', {
    async: true,
    inverse: null
  }),

  taxRate: computed('taxApproach', 'taxApproach.rate', function() {
    return (this.get('taxApproach.rate') || 0.00);
  }),

  totalInCents: computed('total', function() {
    return this.get('total') * 100;
  })
});
