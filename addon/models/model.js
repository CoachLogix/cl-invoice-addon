/* eslint-disable */

import Ember from 'ember';
import DS from 'ember-data';
import attr from 'ember-data/attr';

const { computed } = Ember;
const { Model } = DS;
/**
 * from http://stackoverflow.com/a/8555981
 */
function indefiniteArticle(phrase) {
  // Getting the first word
  let word;
  let match = /\w+/.exec(phrase);
  if (match) {
    word = match[0];
  } else {
    return 'an';
  }

  let l_word = word.toLowerCase();
  // Specific start of words that should be preceeded by 'an'
  let alt_cases = ['honest', 'hour', 'hono'];
  let i;
  for (i = 0; i < alt_cases.length; i++) {
    if (l_word.indexOf(alt_cases[i]) === 0) {
      return 'an';
    }
  }

  // Single letter word which should be preceeded by 'an'
  if (l_word.length === 1) {
    if ('aedhilmnorsx'.indexOf(l_word) >= 0) {
      return 'an';
    } else {
      return 'a';
    }
  }

  // Capital words which should likely be preceeded by 'an'
  if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
    return 'an';
  }

  // Special cases where a word that begins with a vowel should be preceeded by 'a'
  let regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/];
  let j;
  for ( j = 0; j < regexes.length; j++ ) {
    if (l_word.match(regexes[j])) {
      return 'a';
    }
  }

  // Special capital words (UK, UN)
  if (word.match(/^U[NK][AIEO]/)) {
    return 'a';
  }
  else if (word === word.toUpperCase()) {
    if ('aedhilmnorsx'.indexOf(l_word[0]) >= 0) {
      return 'an';
    } else {
      return 'a';
    }
  }

  // Basic method of words that begin with a vowel being preceeded by 'an'
  if ('aeiou'.indexOf(l_word[0]) >= 0) {
    return 'an';
  }

  // Instances where y follwed by specific letters is preceeded by 'an'
  if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/)) {
    return 'an';
  }

  return 'a';
}

/**
 * http://stackoverflow.com/a/21149072
 */
let camelCaseToWords = function(str) {
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x) {
    return x[0].toLowerCase() + x.substr(1).toLowerCase();
  }).join(' ');
};

export default Model.extend({
  permissions: attr('object'),

  modelReference: computed(function() {
    let reference = camelCaseToWords(this.get('_internalModel.modelName'));
    let article = indefiniteArticle(reference) + ' ';
    return article + reference;
  })
});
