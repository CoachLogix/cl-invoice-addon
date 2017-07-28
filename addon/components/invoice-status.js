import Ember from 'ember';
const { Component, computed } = Ember;

export default Component.extend({
  displayableStatus: computed('status', function () {
    const status = this.get('status');
    return status === 'paid_via_stripe' ? 'paid' : status;
  }),

  tooltipContent: computed('status', function () {
    const status = this.get('status');
    return status === 'paid_via_stripe' ? 'Paid via Stripe' : null;
  })
});
