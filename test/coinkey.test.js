var CoinKey = require('../')
var conv = require('binstring')
var secureRandom = require('secure-random')

require('terst')


describe('CoinKey', function() {
  describe('+ CoinKey()', function() {
    describe('> when no parameters', function() {
      it('should generate a random key with default compression', function() {
        var ck1 = new CoinKey();
        var ck2 = new CoinKey();

        EQ (ck1.privateKey.length, 32);
        EQ (ck2.privateKey.length, 32);

        NEQ (ck1.privateKey.toString('hex'), ck2.privateKey.toString('hex'));

        EQ (ck1.compressed, false);
        CoinKey.compressByDefault = true;
        var ck3 = new CoinKey();
        EQ (ck3.compressed, true);
      })
    })

    describe('> when one parameter', function() {
      describe('> when bytes', function() {
        it('should use defaults for rest', function() {
          var privateKey = secureRandom(32);
          var ck1 = new CoinKey(privateKey);
          EQ (ck1.privateKey.toString('hex'), new Buffer(privateKey).toString('hex'));
        })
      })
    })

    //TODO: add more tests for other params
  })

  describe('- publicHash', function() {
    describe('> when not compressed', function() {
      it('should return the 160 bit hash of the uncompressed public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var hash160Hex = "3c176e659bea0f29a3e9bf7880c112b1b31b4dc8";
        var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), false);
        EQ (key.publicHash.toString('hex'), hash160Hex);
        EQ (key.pubKeyHash.toString('hex'), hash160Hex);
      })
    })

    describe('> when compressed', function() {
      it('should return the 160 bit hash of the compressed public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var hash160Hex = "a1c2f92a9dacbd2991c3897724a93f338e44bdc1";
        var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), true);
        EQ (key.publicHash.toString('hex'), hash160Hex);
        EQ (key.pubKeyHash.toString('hex'), hash160Hex);
      })
    })
  })

  describe('- publicAddress', function() {
    describe('> when Bitcoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
          var ck = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
          EQ (ck.publicAddress, '16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS');
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
          var ck = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);
          EQ (ck.publicAddress, '1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s');
        })
      })
    })

    describe('> when Litecoin', function() {
      describe('> when not compressed', function() {
        it('should return the uncompressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
          var ck = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false, {private: 0xB0, public: 0x30});
          EQ (ck.publicAddress, 'LQhgskg1LoWWZsbzCo7GpFffvtCV8Z5GKZ');
        })
      })

      describe('> when compressed', function() {
        it('should return the compressed Bitcoin address', function() {
          var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
          var ck = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true, {private: 0xB0, public: 0x30});
          EQ (ck.publicAddress, 'LZyGd5dCPVkVUjA5QbpuUfMNgcmNDLjswH');
        })
      })
    })
  })



});
