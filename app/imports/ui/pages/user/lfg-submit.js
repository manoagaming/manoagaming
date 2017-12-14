import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { LFG } from '/imports/api/LFG/LFGCollection';

import { Mongo } from 'meteor/mongo'

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const displaySuccessMessageRemove = 'displaySuccessMessageRemove';
const displayErrorMessagesRemove = 'displayErrorMessagesRemove';

Template.LFG_Submit_Page.onCreated(function onCreated() {
  this.subscribe(LFG.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displaySuccessMessageRemove, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(displayErrorMessagesRemove, false);
  this.context = LFG.getSchema().namedContext('LFG_Submit_Page');
});

Template.LFG_Submit_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  successClassRemove() {
    return Template.instance().messageFlags.get(displaySuccessMessageRemove) ? 'success' : '';
  },
  displaySuccessMessageRemove() {
    return Template.instance().messageFlags.get(displaySuccessMessageRemove);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  errorClassRemove() {
    return Template.instance().messageFlags.get(displayErrorMessagesRemove) ? 'error' : '';
  },
  lfg() {
    return LFG.findDoc(FlowRouter.getParam('username'));
  },
  count() {
    return LFG.count();
  }
});


Template.LFG_Submit_Page.events({
  'submit .lfg-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    const game = event.target.Game.value;
    const starttime = new Date(event.target.Start.value);
    const endtime = new Date(event.target.End.value);
    const other = event.target.Other.value;

    const insertedLFGData = { username, game, starttime, endtime, other};

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedLFGData reflects what will be inserted.
    const cleanData = LFG.getSchema().clean(insertedLFGData);
    // Determine validity.
    instance.context.validate(cleanData);

    instance.messageFlags.set(displaySuccessMessageRemove, false);

    if (instance.context.isValid()) {
      const docID = LFG.define({username, game, starttime, endtime, other});
/*      var id;
      if (docID == false) {
        docID = LFG.findDoc(FlowRouter.getParam('username'))._id;
        id = LFG.update(docID, { $set: cleanData });
      }
      else {
        id = docID;
      }*/


      instance.messageFlags.set(displaySuccessMessage, docID);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
  'click .delete'(event, instance) {
    console.log(instance.messageFlags.get(displaySuccessMessage));
    console.log(instance.messageFlags.get(displayErrorMessages));
    console.log(instance.messageFlags.get(displaySuccessMessageRemove));
    console.log(instance.messageFlags.get(displayErrorMessagesRemove));
    instance.messageFlags.set(displayErrorMessages, false);
    instance.messageFlags.set(displaySuccessMessage, false);


    const user = (FlowRouter.getParam('username'));
    event.preventDefault();
    if (LFG.find({ user }).count() > 0) {
      LFG.removeIt(user)
      instance.messageFlags.set(displayErrorMessagesRemove, false);
      instance.messageFlags.set(displaySuccessMessageRemove, true);
    }
    else {
      instance.messageFlags.set(displayErrorMessagesRemove, true);
      instance.messageFlags.set(displaySuccessMessageRemove, false);
    }
  }
});
