import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { LFG } from '/imports/api/LFG/LFGCollection';
import { Mongo } from 'meteor/mongo'

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.LFG_Submit_Page.onCreated(function onCreated() {
  this.subscribe(LFG.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = LFG.getSchema().namedContext('LFG_Submit_Page');
});

Template.LFG_Submit_Page.helpers({
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
});


Template.LFG_Submit_Page.events({
  'submit .lfg-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    const game = event.target.Game.value;
    const starttime = new Date(event.target.Start.value) ;
    const endtime = new Date(event.target.End.value);
    const other = event.target.Other.value;

    console.log(starttime instanceof Date);



    const insertedLFGData = { username, game, starttime, endtime, other};

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedLFGData reflects what will be inserted.
    const cleanData = LFG.getSchema().clean(insertedLFGData);
    // Determine validity.
    instance.context.validate(cleanData);

    console.log(cleanData);

    if (instance.context.isValid()) {
      LFG.define("RsvK6ZT5fAfE2CYYR", { $set: cleanData })
      //const docID = LFG.findDoc(FlowRouter.getParam('username'))._id;
      //const id = LFG.insert(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
