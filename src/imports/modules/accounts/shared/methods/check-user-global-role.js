import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Roles } from 'meteor/alanning:roles';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

const checkUserGlobalRole = new ValidatedMethod({
  name: 'Accounts.checkUserGlobalRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    roles: { type: Array },
    'roles.$': { type: String }
  }).validator(),
  run ({ roles }) {
    // only run on server
    if (Meteor.isServer) {
      if (!Meteor.userId()) {
        return false;
      }
      return Roles.userIsInRole(Meteor.userId(), roles, Roles.GLOBAL_GROUP);
    }
  }
});

export {
  checkUserGlobalRole
};
