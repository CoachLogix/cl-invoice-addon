import Ember from 'ember';
import layout from '../templates/components/invoice-payment';

const { Component, inject, computed } = Ember;

export default Component.extend({
  layout,

  classNames: ['invoice_payment'],

  ajax: inject.service(),
  stripeCheckout: inject.service(),
  ajaxPending: false,

  invoice: computed.alias('model.actionObject'),

  onSuccess() {
    let ajax = this.get('ajax');
    let endpoint = `/api/pendingActions/${this.get('model.id')}/set_disposition`;
    let invoice = this.get('invoice');
    let payload = {
      disposition: 'pay',
      invoice
    };

    ajax.request(endpoint, {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        pendingAction: payload
      })
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

      stripeCheckout.open({
        name: invoice.get('payee.name'),
        image: thumbnail,
        allowRememberMe: false,
        description: 'Invoice Payment',
        currency: invoice.get('currency.currency'),
        amount: invoice.get('totalInCents'),
        token: (token) => {
          this.set('ajaxPending', true);
          ajax.request(url, {
            method: 'POST',
            data: {
              tokenId: token.id,
              receiptEmail: token.email,
              invoiceId: invoice.get('id')
            }
          }).then(() => {
            this.get('onSuccess')();
          }, (err) => {
            this.set('ajaxPending', false);
            this.sendAction('errorAction');
          });
        }
      });
    }
  }
});


