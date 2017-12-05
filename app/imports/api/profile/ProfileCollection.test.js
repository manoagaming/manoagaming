/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = FlowRouter.getParam('username'); // schema requires username.
    const email = 'pjohnson@hawaii.edu';
    const games = '';
    // IGN
    const steamIGN = 'player1';
    const originIGN = 'player1';
    const psnIGN = 'player1';
    const xboxliveIGN = 'player1';
    // Consoles
    const ps = '0';
    const xbox = '1';
    const nintendo = '0';
    const pc = '1';
    const mobile = '1';
    const bio = event.target.Bio.value;

    const defineObject = { ffirstName, lastName, username, email, games, steamIGN, originIGN, psnIGN,
      xboxliveIGN, ps, xbox, nintindo, pc, mobile, bio };

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
      expect(doc.email).to.equal(email);
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
      expect(doc.bio).to.equal(bio);

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
      const defineObject2 = { firstName, lastName, username, email, games, steamIGN, originIGN, psnIGN,
        xboxliveIGN, ps, xbox, nintindo, pc, mobile, bio };
      expect(function foo() { Profiles.define(defineObject2); }).to.throw(Error);
    });

    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { firstName, lastName, username, email, games, steamIGN, originIGN, psnIGN,
        xboxliveIGN, ps, xbox, nintindo, pc, mobile, bio };
      expect(function foo() { Profiles.define(defineObject3); }).to.throw(Error);
    });
  });
}

