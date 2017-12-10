import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';
import { FlowRouter } from 'meteor/kadira:flow-router';

/** @module LFG */

/**
 * LFGs provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class LFGCollection extends BaseCollection {

  /**
   * Creates the LFG collection.
   */
  constructor() {
    super('LFG', new SimpleSchema({
      username: { type: String },
      game: { type: String },
      starttime: { type: Date, },
      endtime: { type: Date, },
      other: { type: String, optional: true },
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new LFG.
   * @example
   * LFG.define({ username: 'jeremy21',
   *                   game: 'World of Warships',
   *                   starttime: '2017-12-03T22:00',
   *                   endtime: '2017-12-04T01:00',
   *                   other: 'Anyone welcome',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define ({ username, game, starttime, endtime, other }) {
    // make sure required fields are OK.

    const checkPattern = { username: String, game: String, starttime: Date, endtime: Date, other: String};
    check({ username, game, starttime, endtime, other }, checkPattern);

    /*const checkPattern = { username: String, game: String, starttime: String, endtime: String, other: String};
    check({ username, game, starttime, endtime, other }, checkPattern); */

    console.log(this.find({ username }).count());
    if (this.find({ username }).count() > 0) {
      return this._collection.update(this.findDoc(FlowRouter.getParam('username'))._id, { $set: {username, game, starttime, endtime, other}});
    }


    console.log("You've made it this far");
    console.log(username);
    console.log(game);
    console.log(starttime);
    console.log(endtime);
    console.log(other);

    return this._collection.insert({ username, game, starttime, endtime, other});
  }

  /**
   * Returns an object representing the LFG docID in a format acceptable to define().
   * @param docID The docID of a LFG.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const game = doc.game;
    const starttime = doc.starttime;
    const endtime = doc.endtime;
    const other = doc.other;
    return { username, game, starttime, endtime, other};
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const LFG = new LFGCollection();
