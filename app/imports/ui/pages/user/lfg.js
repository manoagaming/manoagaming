import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { LFG } from '/imports/api/LFG/LFGCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.LFG_Page.onCreated(function onCreated() {
  this.subscribe(LFG.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = LFG.getSchema().namedContext('LFG_Page');
});

Template.LFG_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  lfg() {
    return LFG.findDoc(FlowRouter.getParam('username'));
  },
  routeUserName() {
    return FlowRouter.getParam('username');
  },
});


Template.LFG_Page.events({
  'submit .lfg-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username');
    const game = event.target.Game.value;
    const starttime = event.target.Start.value;
    const endtime = event.target.End.value;
    const other = event.target.Other.value;

    const updatedLFGData = { username, game, starttime, endtime, other };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedLFGData reflects what will be inserted.
    const cleanData = LFGs.getSchema().clean(updatedLFGData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = LFGs.findDoc(FlowRouter.getParam('username'))._id;
      const id = LFGs.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

$
