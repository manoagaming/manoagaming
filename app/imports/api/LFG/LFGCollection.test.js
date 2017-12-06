/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { LFG } from '/imports/api/LFG/LFGCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('LFGCollection', function testSuite() {
    const username = 'jeremy21';
    const game = 'World of Warships';
    const starttime = new Date("2017-12-03T22:00:00");
    const endtime = new Date("2017-12-04T01:00:00");
    const other = 'Anyone Welcome';
    const defineObject = { username, game, starttime, endtime, other};

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = LFG.define(defineObject);
      expect(LFG.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = LFG.findDoc(docID);
      expect(doc.username).to.equal(username);
      expect(doc.game).to.equal(game);
      expect(doc.starttime).to.equal(starttime);
      expect(doc.endtime).to.equal(endtime);
      expect(doc.other).to.equal(other);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { LFG.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a LFG.
      const dumpObject = LFG.dumpOne(docID);
      LFG.removeIt(docID);
      expect(LFG.isDefined(docID)).to.be.false;
      docID = LFG.restoreOne(dumpObject);
      expect(LFG.isDefined(docID)).to.be.true;
      LFG.removeIt(docID);
    });

    /*
    it('#define (illegal interest)', function test() {
      const illegalInterests = ['foo'];
      const defineObject2 = { username, game, username, starttime, interests: illegalInterests, endtime, other,
        github, facebook, instagram };
      expect(function foo() { LFG.define(defineObject2); }).to.throw(Error);
    });
    */
    /*
    it('#define (duplicate interests)', function test() {
      const duplicateInterests = [interestName, interestName];
      const defineObject3 = { username, game, username, starttime, interests: duplicateInterests, endtime, other,
        github, facebook, instagram };
      expect(function foo() { LFG.define(defineObject3); }).to.throw(Error);
    });
    */


  });
}

