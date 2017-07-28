/*jshint node:true*/
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    stripe: {
      key: 'pk_test_jOook5T7tGKxyyW1ivtdqUMA',
      requirePaymentDetails: false
    }
  };
};
