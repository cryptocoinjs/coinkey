var assert = require('assert')
var CoinKey = require('../')
var secureRandom = require('secure-random')

describe('CoinKey', function() {
  
})


describe('CoinKey', function() {
  describe('+ CoinKey()', function() {
    describe('> when no parameters', function() {
      it('should generate a random key with default compression', function() {
        var ck1 = new CoinKey()
        var ck2 = new CoinKey()

        assert.equal(ck1.privateKey, undefined)
        assert.equal(ck2.privateKey, undefined)

        //assert.notEqual(ck1.privateKey.toString('hex'), ck2.privateKey.toString('hex'))

        assert.equal(ck1.compressed, true)
      })
    })

    describe('> when one parameter', function() {
      describe('> when bytes exist', function() {
        it('should use defaults for rest', function() {
          var privateKey = secureRandom(32)
          var ck1 = new CoinKey(privateKey)
          assert.equal(ck1.privateKey.toString('hex'), new Buffer(privateKey).toString('hex'))
        })
      })

      describe('> when versions are passed', function() {
        it('should use the versions', function() {
          var ck = new CoinKey({private: 0x34, public: 0xB4}) //<-- namecoin
          assert.equal(ck.privateKey, undefined)
          assert(ck.compressed)
          assert.equal(ck.versions.private, 0x34)
          assert.equal(ck.versions.public, 0xB4)
        })
      })
    })

    describe('> when two parameters', function() {
      describe('> when compressed and versions are passed', function() {
        it('should generate a random private key', function() {
          var ck = new CoinKey(true, {private: 0x34, public: 0xB4}) //<-- namecoin
          assert.equal(ck.privateKey, undefined)
          assert(ck.compressed)
        })
      })
    })

    //TODO: add more tests for other params
  })

  describe('- privateWif', function() {
    describe('> when Bitcoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), false)
          assert.equal(ck.privateWif, '5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD')
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true)
          assert.equal(ck.privateWif, 'KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3')
        })
      })
    })

    describe('> when Litecoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), false, {private: 0xB0, public: 0x30})
          assert.equal(ck.privateWif, '6uFjYQnot5Gtg3HpP87bp4JUpg4FH1gkkV3RyS7LHBbD9Hpt1na')
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true, {private: 0xB0, public: 0x30})
          assert.equal(ck.privateWif, 'T3e2me1BvRs95K7E8eQ8eha9oRPL1g2U6vmjE5px6RjzbUTvKZsf')
        })
      })
    })
  })

  describe('- publicAddress', function() {
    describe('> when Bitcoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), false)
          assert.equal(ck.publicAddress, '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS')
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true)
          assert.equal(ck.publicAddress, '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s')
        })
      })
    })

    describe('> when Litecoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), false, {private: 0xB0, public: 0x30})
          assert.equal(ck.publicAddress, 'LQhgskg1LoWWZsbzCo7GpFffvtCV8Z5GKZ')
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
          var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true, {private: 0xB0, public: 0x30})
          assert.equal(ck.publicAddress, 'LZyGd5dCPVkVUjA5QbpuUfMNgcmNDLjswH')
        })
      })
    })
  })

  describe('- versions', function() {
    describe('> when object changes', function() {
      it('should change the wif and public address', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
        var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true)

        assert.equal(ck.privateWif, 'KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3')
        assert.equal(ck.publicAddress, '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s')

        ck.versions = {public: 0x1E, private: 0x9E} //change to DOGECOIN

        assert.equal(ck.privateWif, 'QPCgUjWzmfNfXzsQBHJ4KZsPKbmaz99PAyZP9ubFFpBBXWuSQh6n')
        assert.equal(ck.publicAddress, 'DKtQu8G1cFQikveWy3qAkQTDMY8PKVU18Z')
    
      })
    })

    describe('> when field changes', function() {
      it('should change the wif and public address', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
        var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'), true)

        assert.equal(ck.privateWif, 'KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3')
        assert.equal(ck.publicAddress, '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s')

        //change to DOGECOIN
        ck.versions.public = 0x1E
        ck.versions.private = 0x9E 

        assert.equal(ck.privateWif, 'QPCgUjWzmfNfXzsQBHJ4KZsPKbmaz99PAyZP9ubFFpBBXWuSQh6n')
        assert.equal(ck.publicAddress, 'DKtQu8G1cFQikveWy3qAkQTDMY8PKVU18Z')
      })
    })
  })


  describe('- toString()', function() {
    it('should return the hex string of the privateKey', function() {
      var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd"
      var ck = new CoinKey(new Buffer(privateKeyHex, 'hex'))
      assert.equal(ck.toString(), ck.privateKey.toString('hex'))
    })
  })


  describe('+ fromWif()', function() {
    describe('> when Bitcoin', function() {
      describe('> when compressed', function() {
        it('should create a new compressed CoinKey', function() {
          var ck = CoinKey.fromWif('KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3')
          assert.equal(ck.compressed, true)
          assert.equal(ck.privateKey.toString('hex'), "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd")
          assert.equal(ck.publicAddress, "1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s")
        })
      })

      describe('> when not compressed', function() {
        it('should create a new compressed CoinKey', function() {
          var ck = CoinKey.fromWif('5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD')
          assert.equal(ck.compressed, false)
          assert.equal(ck.privateKey.toString('hex'), "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd")
          assert.equal(ck.publicAddress, '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS')
        })
      })
    })

    describe('> when Namecoin', function() {
      describe('> when compressed', function() {
        it('should create a new compressed CoinKey', function() {
          var ck = CoinKey.fromWif('TdxZ4HSnd3XgyPAJLwyhqPx6oABwMM7NkhGFTuDL4LkqioDbkZWj')
          assert.equal(ck.compressed, true)
          assert.equal(ck.privateKey.toString('hex'), "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd")
          assert.equal(ck.publicAddress, "NBKgZWpMEDbzkTiRWHABRASXCdo8zWM8qC")
        })
      })

      describe('> when not compressed', function() {
        it('should create a new compressed CoinKey', function() {
          var ck = CoinKey.fromWif('732iFLawHmyoDKce1SbbdLhaV8X7sq4Fu3Krx2rvFocm7qNwwiQ')
          assert.equal(ck.compressed, false)
          assert.equal(ck.privateKey.toString('hex'), "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd")
          assert.equal(ck.publicAddress, 'N246pBsABXN1qcALJUSYkkkpSuEG3KTTGR')
        })
      })
    })
  })

})
