import Ember from 'ember';
import InitialsAvatarComponent from 'initials-avatar/components/initials-avatar';

const { computed, inject } = Ember;

export default InitialsAvatarComponent.extend({
  classNames: ['avatar-icon'],
  static: false,

  classNameBindings: ['routable:avatar-icon_routable'],
  absoluteRouting: inject.service('absoluteRouting'),

  avatarColor: computed('hasImage', 'maxColors', 'colorIndex', function() {
    let index = this.get('colorIndex');
    let hasImage = this.get('hasImage');

    if (hasImage) {
      return '';
    }

    index = (index - 1) % this.get('maxColorIndex') + 1;
    return `avatarColor-${index}`;
  }),
  routable: computed('static', 'model', function() {
    return (!this.get('static') && this.get('model'));
  })
});
