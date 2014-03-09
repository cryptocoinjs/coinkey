var CoinKey = require('../')
var conv = require('binstring')
var secureRandom = require('secure-random')
var ECKey = require('eckey');

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
  })

  /*describe('- privateKey', function() {
    it('should return the private key', function() {
      var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
      var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}));
      EQ (key.privateKey.toString('hex'), privateKeyHex);
    })
  })

  describe('- privateExportKey', function() {
    describe('> when not compressed', function() {
      it('should return the private key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
        EQ (key.privateExportKey.toString('hex'), privateKeyHex);
      })
    })

    describe('> when compressed', function() {
      it('should return the private key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);
        EQ (key.compressed, true);
        EQ (key.privateExportKey.toString('hex'), privateKeyHex + "01");
      })
    })
  })

  describe('- publicKey', function() {
    describe('> when not compressed', function() {
      it('should return the 65 byte public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var publicKeyHex = "04d0988bfa799f7d7ef9ab3de97ef481cd0f75d2367ad456607647edde665d6f6fbdd594388756a7beaf73b4822bc22d36e9bda7db82df2b8b623673eefc0b7495";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), false);
        EQ (key.publicKey.length, 65);
        EQ (key.publicKey.toString('hex'), publicKeyHex);
      })
    })

    describe('> when compressed', function() {
      it('should return the 33 byte public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var publicKeyHex = "03d0988bfa799f7d7ef9ab3de97ef481cd0f75d2367ad456607647edde665d6f6f";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), true);

        T (key.compressed);
        EQ (key.publicKey.length, 33);
        EQ (key.publicKey.toString('hex'), publicKeyHex);
      })
    })
  })

  describe('- publicHash', function() {
    describe('> when not compressed', function() {
      it('should return the 160 bit hash of the uncompressed public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var hash160Hex = "3c176e659bea0f29a3e9bf7880c112b1b31b4dc8";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), false);
        EQ (key.publicHash.toString('hex'), hash160Hex);
        EQ (key.pubKeyHash.toString('hex'), hash160Hex);
      })
    })

    describe('> when compressed', function() {
      it('should return the 160 bit hash of the compressed public key', function() {
        var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
        var hash160Hex = "a1c2f92a9dacbd2991c3897724a93f338e44bdc1";
        var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), true);
        EQ (key.publicHash.toString('hex'), hash160Hex);
        EQ (key.pubKeyHash.toString('hex'), hash160Hex);
      })
    })
  })

  describe('- publicPoint', function() {
    it('should return the point object', function() {
      var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
      var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'bytes'}), false);
      T (key.publicPoint);
    })
  })


  describe('- toString()', function() {
    it('should show the string representation in...', function() {
      var privateKeyBytes = conv("1184CD2CDD640CA42CFC3A091C51D549B2F016D454B2774019C2B2D2E08529FD", {in: 'hex', out: 'bytes'})
      var eckey = new ECKey(privateKeyBytes)
      var s = eckey.toString()
      EQ (s, '1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd')
    })
  })*/



});
