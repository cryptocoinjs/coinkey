var util = require('util');

var ECKey = require('eckey');
var coinstring = require('coinstring');
var secureRandom = require('secure-random');


module.exports = CoinKey

//Bitcoin defaults
var defaultVersions = {
  public: 0x0,
  private: 0x80
}

function CoinKey (bytes, compressed, versions) {
  if (!(this instanceof CoinKey)) return new CoinKey(bytes, compressed, versions);
  
  if (arguments.length === 3) {
    ECKey.call(this, bytes, compressed);
  } else if (arguments.length < 3 && arguments.length > 0) {

  } else { // no args
    bytes = secureRandom(32);
    compressed = CoinKey.compressByDefault || false;
    versions = defaultVersions;
    ECKey.call(this, bytes, compressed);
  }
}
util.inherits(CoinKey, ECKey);

//Static Props

CoinKey.compressByDefault = false;


//Instance Methods

CoinKey.prototype.toString = function (format) {
  
}









