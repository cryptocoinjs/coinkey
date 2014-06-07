var util = require('util')

var ECKey = require('eckey')
var cs = require('coinstring')
var secureRandom = require('secure-random')

module.exports = CoinKey

function CoinKey (bytes, compressed, versions) {
  if (!(this instanceof CoinKey)) return new CoinKey(bytes, compressed, versions)

  var DEF_VERSIONS = {public: 0x0, private: 0x80}

  this._versions = versions || DEF_VERSIONS

  if (arguments.length === 3) {
    ECKey.call(this, bytes, compressed)
  } else if (arguments.length < 3 && arguments.length > 0) {
    var args = [].slice.call(arguments)
    var newBytes = null, newCompressed = CoinKey.compressByDefault, newVersions = DEF_VERSIONS
    for (var i = 0; i < args.length; ++i) {
      if (args[i]['length'] != null) //Array or Buffer
        newBytes = args[i]
      else if (typeof args[i] == 'object' && typeof args[i]['length'] == 'undefined')
        newVersions = args[i]
      else if (typeof args[i] == 'boolean')
        newCompressed = args[i]
    }

    ECKey.call(this, newBytes, newCompressed)
    this._versions = newVersions || DEF_VERSIONS
  } else { // no args
    ECKey.call(this)
  }
}
util.inherits(CoinKey, ECKey)

//Instance props

Object.defineProperty(CoinKey.prototype, 'versions', {
  enumerable: true, configurable: true,
  get: function() {
    return this._versions
  },
  set: function(versions) {
    this._versions = versions
  }
})

Object.defineProperty(CoinKey.prototype, 'privateWif', {
  get: function() {
    return cs.encode(this.privateExportKey, this.versions.private)
  }
})

Object.defineProperty(CoinKey.prototype, 'publicAddress', {
  get: function() {
    return cs.encode(this.pubKeyHash, this.versions.public)
  }
})

//Class methods

CoinKey.fromWif = function(wif, versions) { //this may make more sense to put in the constructor
  var res = cs.decode(wif)
  var bytes = res.payload
  var compressed = (res.payload.length === 33)
  if (compressed) bytes = bytes.slice(0, 32) //slice off compression byte

  var v = versions || {}
  v.private = v.private || res.version.readUInt8(0)
  v.public = v.public || v.private - 0x80

  var ck = new CoinKey(bytes, compressed, v)
  return ck
}












