var assert = require('assert')
var util = require('../lib/util')

/* global describe, it */

describe('util', function () {
  describe('normalizeVersions()', function () {
    it('should normalize the versions object (i.e. be compatible with coininfo)', function () {
      assert.deepEqual(util.normalizeVersions({ public: 1, private: 2 }), { public: 1, private: 2 })
      assert.deepEqual(util.normalizeVersions({ versions: { public: 1, private: 2 } }), { public: 1, private: 2 })
      assert.deepEqual(util.normalizeVersions({ version: { public: 1, private: 2 } }), { public: 1, private: 2 })

      assert.deepEqual(util.normalizeVersions({}), null)
      assert.deepEqual(util.normalizeVersions(null), null)
    })
  })
})
