import Ember from 'ember';
import StatusIcon from '../component';

const { computed } = Ember;

export default StatusIcon.extend({
  isDraft: computed.equal('status', 'draft'),
  isIssued: computed.equal('status', 'issued'),
  isPaid: computed.equal('status', 'paid'),
  isPaidViaStripe: computed.equal('status', 'paid_via_stripe'),
  isLate: computed.equal('status', 'late'),

  tooltipContent: computed('status', function(){
    if (this.get('isDraft')) {
      return 'Draft';
    } else if (this.get('isIssued')) {
      return 'Issued';
    } else if (this.get('isPaid')) {
      return 'Paid';
    } else if (this.get('isPaidViaStripe')) {
      return 'Paid via Stripe';
    } else if (this.get('isLate')) {
      return 'Late';
    }
  }),
  classNameBindings: [
    'isDraft:status-icon_draft',
    'isIssued:status-icon_issued',
    'isPaid:status-icon_paid',
    'isLate:status-icon_late',
    'isPaidViaStripe:status-icon_paid'
  ],
});
