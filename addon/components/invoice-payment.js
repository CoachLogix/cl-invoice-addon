import Ember from 'ember';
import layout from '../templates/components/invoice-payment';

const { Component, inject, computed } = Ember;

export default Component.extend({
  layout: layout,

  classNames: ['invoice_payment'],

  ajax: inject.service(),
  stripeCheckout: inject.service(),
  ajaxPending: false,

  invoice: computed.alias('model.actionObject'),
  apiEndpoint: computed('model', function() {
    let modelId = this.get('model.id');
    return `/api/pendingActions/${modelId}/set_disposition`;
  }),

  onSuccess: function() {
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
    }).then(() => {
      this.set('ajaxPending', false);
      this.sendAction('successAction');
    });
  },
  actions: {
    payInvoice: function () {
      let stripeCheckout = this.get('stripeCheckout');
      let ajax = this.get('ajax');
      let url = '/api/stripe/pay';
      let invoice = this.get('invoice');
      let toast = this.get('toast');

      if (invoice.get('payee.avatar')) {
        thumbnail = invoice.get('payee.avatar.thumbnail');
      }

      stripeCheckout
        .open({
          name: invoice.get('payee.name'),
          image: thumbnail,
          allowRememberMe: false,
          description: 'Invoice Payment',
          currency: invoice.get('currency.currency'),
          amount: invoice.get('totalInCents'),
          token: (token) => {
            ajax.request(url, {
              method: 'POST',
              data: {
                tokenId: token.id,
                receiptEmail: token.email,
                invoiceId: invoice.get('id')
              }
            }).then(() => {
              invoice.reload();
              this.get('onSuccess')();
            }, (err) => {
              this.sendAction('errorAction');
            });
          }
        });
      }
    }
  }
);

