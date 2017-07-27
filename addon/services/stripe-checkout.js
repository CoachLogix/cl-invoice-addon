import Ember from 'ember';
import ENV from 'coachlogix/config/environment';

const { Service } = Ember;

const handler = StripeCheckout.configure({ // eslint-disable-line
  key: ENV.stripe.key,
  locale: 'auto',
  image: '/assets/images/cl_logo_square.jpg',
  zipCode: ENV.stripe.requirePaymentDetails,
  address: ENV.stripe.requirePaymentDetails
});

export default Service.extend({
  open(config) {
    return handler.open(config);
  }
});
