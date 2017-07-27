import Ember from 'ember';

const { Helper, String } = Ember;

export function formatMoney([amount, code, symbol]) {
  let formattedAmount;

  if (!amount) {
    formattedAmount = '0';
  } else {
    formattedAmount = parseFloat(amount, 10).toFixed(2);
  }

  if (code) {
    code = ` ${code}`;
  }
  return String.htmlSafe(symbol + formattedAmount + code);
}

export default Helper.helper(formatMoney);
