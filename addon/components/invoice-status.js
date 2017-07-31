import Ember from 'ember';
import layout from '../templates/components/invoice-status';
const { Component, computed } = Ember;

export default Component.extend({
  layout,

  displayableStatus: computed('status', function () {
    const status = this.get('status');
    return status === 'paid_via_stripe' ? 'paid' : status;
  }),

  tooltipContent: computed('status', function () {
    const status = this.get('status');
    return status === 'paid_via_stripe' ? 'Paid via Stripe' : null;
  })
});
