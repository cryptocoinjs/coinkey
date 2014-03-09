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
    var args = [].slice.call(arguments);
    var newBytes = null, newCompressed = CoinKey.compressByDefault, newVersions = defaultVersions;
    for (var i = 0; i < args.length; ++i) {
      if (args[i]['length'] != null) //Array or Buffer
        newBytes = args[i];
      else if (typeof args[i] == 'object' && typeof args[i]['length'] == 'undefined')
        newVersions = args[i];
      else if (typeof args[i] == 'boolean')
        newCompressed = args[i];
    }
    ECKey.call(this, newBytes, newCompressed);
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


//Instance props

Object.defineProperty(ECKey.prototype, 'versions', {
  enumerable: true, configurable: true,
  get: function() {
    return this._versions;
  },
  set: function(versions) {
    this._versions = versions;
  }
})

//Instance Methods

CoinKey.prototype.toString = function (format) {
  
}









