import Ember from 'ember';
const { computed, Component } = Ember;

export default Component.extend({
  tagName: '',
  isOrganization: computed('model', 'model.content', function() {
    let modelName = this.get('model.content.constructor.modelName');

    if (!modelName) {
      modelName = this.get('model.constructor.modelName');
    }

    return modelName === 'organization';
  }),
  isSearchResult: computed('model', 'model.content', function() {
    let modelName = this.get('model.content.constructor.modelName');

    if (!modelName) {
      modelName = this.get('model.constructor.modelName');
    }

    return modelName === undefined;
  }),
  isUser: computed('model', 'model.content', function() {
    let modelName = this.get('model.content.constructor.modelName');

    if (!modelName) {
      modelName = this.get('model.constructor.modelName');
    }

    return modelName === 'user';
  }),
  isUserAccount: computed('model', 'model.content', function() {
    let modelName = this.get('model.content.constructor.modelName');

    if (!modelName) {
      modelName = this.get('model.constructor.modelName');
    }

    return modelName === 'user-account';
  }),
  isEmail: computed('model', function() {
    return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.get('model')));
  })
});
