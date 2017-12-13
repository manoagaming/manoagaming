import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { LFG } from '/imports/api/LFG/LFGCollection';


Template.LFG_Page.onCreated(function onCreated() {
  this.subscribe(LFG.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
});

Template.LFG_Page.helpers({
  profiles() {
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },
  lfg() {
    // Find all profiles with the currently selected interests.
    const allLFGs = LFG.findAll();
    /*return _.filter(allLFGs, profile => _.intersection(profile.interests, selectedInterests).length > 0);*/
    return allLFGs;
  },

  routeUserName() {
      return FlowRouter.getParam('username');
  },

  interests() {
    return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        });
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },
});
