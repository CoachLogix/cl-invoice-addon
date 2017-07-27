import Ember from 'ember';
import layout from '../templates/components/invoice-payment';

const { Component, inject, computed } = Ember;

export default Component.extend({
  layout: layout,

  classNames: ['invoice_payment'],

  stripeCheckout: inject.service(),
  ajax: inject.service(),
  ajaxPending: false,

  invoice: computed.alias('model.actionObject'),
  apiEndpoint: computed('model', function() {
    let modelId = this.get('model.id');
    return `/api/pendingActions/${modelId}/set_disposition`;
  }),

  actions: {
    submit: function() {
      // gather responses, build payload
      let ajax = this.get('ajax');
      let component = this;
      let endpoint = this.get('apiEndpoint');
      let invoice = this.get('invoice');
      let payload = {
        disposition: 'pay',
        invoice
      };

      this.set('ajaxPending', true);

      // post to pendingActions/set_disposition endpoint
      let request = ajax.request(endpoint, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({pendingAction: payload})
      });

      // catch success/failure and bubble actions appropriately
      let onSuccess = function() {
          component.set('ajaxPending', false);
          component.sendAction('successAction');
      };
      let onError = function() {
          component.set('ajaxPending', false);
          component.sendAction('errorAction');
      };

      request.then(onSuccess, onError);
    }
  }
});
