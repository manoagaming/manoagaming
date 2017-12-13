/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const interestName = 'Software Engineering';
    const interestDescription = 'Tools for software development';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const bio = 'I have been a professor of computer science at UH since 1990.';
    const interests = [interestName];
    const games = 'Mine Craft';
    const steamIGN = 'prof_pjs';
    const originIGN = 'prof_pjo';
    const psnIGN = 'prof_pjp';
    const xboxliveIGN = 'prof_pjx';
    //const ps = '';
    //const xbox = '';
    //const nintendo = '';
    //const pc = '';
    //const mobile = '';



    //const picture = 'http://philipmjohnson.org/headshot.jpg';
    const defineObject = { firstName, lastName, username, bio, interests, games, steamIGN, originIGN, psnIGN,
      xboxliveIGN, ps, xbox, nintendo, pc, mobile };

    before(function setup() {
      removeAllEntities();
      // Define a sample interest.
      Interests.define({ name: interestName, description: interestDescription });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Profiles.define(defineObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Profiles.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.bio).to.equal(bio);
      expect(doc.interests[0]).to.equal(interestName);
      //expect(doc.picture).to.equal(picture);
      expect(doc.games).to.equal(games);
      expect(doc.steamIGN).to.equal(steamIGN);
      expect(doc.originIGN).to.equal(originIGN);
      expect(doc.psnIGN).to.equal(psnIGN);
      expect(doc.xboxliveIGN).to.equal(xboxliveIGN);
      expect(doc.ps).to.equal(ps);
      expect(doc.xbox).to.equal(xbox);
      expect(doc.nintendo).to.equal(nintendo);
      expect(doc.pc).to.equal(pc);
      expect(doc.mobile).to.equal(mobile);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Profiles.dumpOne(docID);
      Profiles.removeIt(docID);
      expect(Profiles.isDefined(docID)).to.be.false;
      docID = Profiles.restoreOne(dumpObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      Profiles.removeIt(docID);
    });

    it('#define (illegal interest)', function test() {
      const illegalInterests = ['foo'];
      const defineObject2 = { firstName, lastName, username, bio, interests: illegalInterests, games, steamIGN,
        originIGN, psnIGN, xobxliveIGN, ps, xbox, nintendo, pc, mobile };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { firstName, lastName, username, bio, interests: illegalInterests, games, steamIGN,
        originIGN, psnIGN, xobxliveIGN, ps, xbox, nintendo, pc, mobile };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
  });
}

