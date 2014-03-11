var util = require('util');

var ECKey = require('eckey');
var coinstring = require('coinstring');
var secureRandom = require('secure-random');

var hashing = coinstring.hashing; //non-standard

module.exports = CoinKey

function CoinKey (bytes, compressed, versions) {
  if (!(this instanceof CoinKey)) return new CoinKey(bytes, compressed, versions);


  this._versions = versions || CoinKey.defaultVersions;

  if (arguments.length === 3) {
    ECKey.call(this, bytes, compressed);
  } else if (arguments.length < 3 && arguments.length > 0) {
    var args = [].slice.call(arguments);
    var newBytes = null, newCompressed = CoinKey.compressByDefault, newVersions = CoinKey.defaultVersions;
    for (var i = 0; i < args.length; ++i) {
      if (args[i]['length'] != null) //Array or Buffer
        newBytes = args[i];
      else if (typeof args[i] == 'object' && typeof args[i]['length'] == 'undefined')
        newVersions = args[i];
      else if (typeof args[i] == 'boolean')
        newCompressed = args[i];
    }

    if (newBytes == null)
      newBytes = secureRandom(32);

    ECKey.call(this, newBytes, newCompressed);
    this._versions = newVersions || CoinKey.defaultVersions;
  } else { // no args
    bytes = secureRandom(32);
    compressed = CoinKey.compressByDefault || false;
    versions = CoinKey.defaultVersions;
    ECKey.call(this, bytes, compressed);
  }
}
util.inherits(CoinKey, ECKey);

//Static Props

CoinKey.compressByDefault = false;
CoinKey.defaultVersions = {public: 0x0, private: 0x80}; //Bitcoin defaults

//Instance props

Object.defineProperty(CoinKey.prototype, 'versions', {
  enumerable: true, configurable: true,
  get: function() {
    return this._versions;
  },
  set: function(versions) {
    function onChange() {
      this._pubKeyHash = null;
    }

    //var _private = versions.private;
    //var _public = versions.public;



    this._versions = versions;
  }
})

Object.defineProperty(CoinKey.prototype, 'privateWif', {
  get: function() {
    return coinstring(this.versions.private, this.privateExportKey);
  }
})

Object.defineProperty(CoinKey.prototype, 'publicAddress', {
  get: function() {
    return coinstring(this.versions.public, this.pubKeyHash);
  }
})

Object.defineProperty(CoinKey.prototype, 'pubKeyHash', {
  get: function() {
    if (!this._pubKeyHash)
      this._pubKeyHash = hashing.sha256ripe160(this.publicKey, {in: 'buffer', out: 'buffer'}); //sha256ripe160 should default on buffer, fix
    return this._pubKeyHash;
  }
})

Object.defineProperty(CoinKey.prototype, 'publicHash', {
  get: function() {
    return this.pubKeyHash;
  }
})

//Class methods

CoinKey.fromWif = function(wif, versions) { //this may make more sense to put in the constructor
  var res = coinstring.decode(wif);
  var bytes = res.bytes
  var compressed = (res.bytes.length === 33);
  if (compressed) bytes = bytes.slice(0, 32); //slice off compression byte

  var v = versions || {};
  v.private = v.private || res.version;
  v.public = v.public || v.private - 0x80;

  var ck = new CoinKey(bytes, compressed, v);
  return ck;
}











