import SimpleSchema from 'simpl-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Tracker } from 'meteor/tracker';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      email: { type: String },
      games: { type: String, optional: true },
      steamIGN: { type: String, optional: true },
      originIGN: { type: String, optional: true },
      psnIGN: { type: String, optional: true },
      xboxliveIGN: { type: String, optional: true },
      ps: { type: Boolean, optional: true },
      xbox: { type: Boolean, optional: true },
      nintendo: { type: Boolean, optional: true },
      pc: { type: Boolean, optional: true },
      mobile: { type: Boolean, optional: true },
      bio: { type: String, optional: true }
    }, { tracker: Tracker }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username, email = '', games = [], steamIGN = '', originIGN = '',
           psnIGN = '', xboxliveIGN = '', ps = '', xbox = '', nintendo = '', pc = '', mobile = '',
           bio = ''  }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, email: String, games: String,
      steamIGN: String, originIGN: String, psnIGN: String, xboxliveIGN: String, ps: String, xbox: String,
      nintendo: String, pc: String, mobile: String, bio: String };
    check({ firstName, lastName, username, email, games, steamIGN, originIGN, psnIGN, xboxliveIGN, ps, xbox,
            nintindo, pc, mobile, bio }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);

    // Throw an error if there are duplicates in the passed interest names.
    if (interests.length !== _.uniq(interests).length) {
      throw new Meteor.Error(`${interests} contains duplicates`);
    }

    return this._collection.insert({ firstName, lastName, username, email, games, steamIGN, originIGN, psnIGN,
                                     xboxliveIGN, ps, xbox, nintindo, pc, mobile, bio });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const email = doc.email;
    const games = doc.games;
    const steamIGN = doc.steamIGN;
    const originIGN = doc.originIGN;
    const psnIGN = doc.psnIGN;
    const xboxliveIGN = doc.xboxliveIGN;
    const ps = doc.ps;
    const xbox = doc.xbox;
    const nintendo = doc.nintendo;
    const pc = doc.pc;
    const mobile = doc.mobile;
    const bio = doc.bio;
    return { firstName, lastName, username, email, games, steamIGN, originIGN, psnIGN,
      xboxliveIGN, ps, xbox, nintindo, pc, mobile, bio };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
