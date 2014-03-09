coinkey
=======

JavaScript component for private keys, public keys, and addresess for crypto currencies such as Bitcoin, Litecoin, and Dogecoin.


Why?
----

This module provides a convenient way to compute all of the relevant crypto currency details of private keys, public keys, and addresses. It inherits from [ECKey][eckey] and adds the utility of [coinstring][coinstring]. 


Installation
------------

    npm install --save coinkey


Usage
-----

### API

#### CoinKey([bytes], [compressed], [versions])

Constructor function.

- **bytes**: The private key bytes. Must be 32 bytes in length. Should be an `Array`, `Uint8Array`, or a `Buffer`. If not passed, one will be randomlyl generated.
- **compressed**: Specify whether the key should be compressed or not.
- **versions**: An object that specifies the public and private key versions for addresses and wifs. Defaults to Bitcoin `mainnet`.

```js
var CoinKey = require('eckey');
var secureRandom = require('secure-random'); 

var bytes = secureRandom(32); //https://github.com/jprichardson/secure-random
var key1 = new ECKey(bytes);
var key2 = ECKey(bytes); //<--- can also use without "new"
var compressedKey = new ECKey(bytes, true);
```



#### compressed

Get/set whether the point on the curve is compressed. Affects the output of the WIF (wallet import format) and the address.


#### privateKey

Get/set the private key. When setting, the type can be either an `Array`, `Buffer`, or `Uint8Array`. When getting, the type is always `Buffer`. Setting would be useful if you don't pass a private key to the constructor.

```js
var ECKey = require('eckey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.privatekey.toString('hex')); // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd

var keyCompressed = ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);

//nothing changes when compressed
console.log(key.privatekey.toString('hex')); // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd
```


#### privateExportKey

Get the private key along with a byte for compression if `compressed` is true. i.e.

    if compressed
      privateExportKey = privateKey + 0x01
    else
      privateExportKey = privateKey

This is useful inconjunction with the package [coinstring](https://github.com/cryptocoinjs/coinstring) to generate
[Wallet Import Format](https://en.bitcoin.it/wiki/Wallet_import_format) keys.

```js
var ECKey = require('eckey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.privateExportKey.toString('hex')); // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd

var keyCompressed = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);

//notice the extra "01" at the end?
console.log(key.privateExportKey.toString('hex')); // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd01
```


#### publicKey

Get the public key. The type is `Buffer`.

```js
var ECKey = require('eckey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.publickey.toString('hex')); 
// => 04d0988bfa799f7d7ef9ab3de97ef481cd0f75d2367ad456607647edde665d6f6fbdd594388756a7beaf73b4822bc22d36e9bda7db82df2b8b623673eefc0b7495

var keyCompressed = ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);

console.log(key.publickey.toString('hex')); 
// => 03d0988bfa799f7d7ef9ab3de97ef481cd0f75d2367ad456607647edde665d6f6f
```


#### publicHash

Alias: `pubKeyHash`

Get the public hash i.e. the ripemd160(sha256(publicKey))

```js
var ECKey = require('eckey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.publicHash.toString('hex')) // => 3c176e659bea0f29a3e9bf7880c112b1b31b4dc8
console.log(key.publKeyHash.toString('hex')) // => 3c176e659bea0f29a3e9bf7880c112b1b31b4dc8

var keyCompressed = ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);
console.log(key.publicHash.toString('hex')) // => a1c2f92a9dacbd2991c3897724a93f338e44bdc1
console.log(key.publKeyHash.toString('hex')) // => a1c2f92a9dacbd2991c3897724a93f338e44bdc1
```


#### publicPoint

Get the [Public Key Point](https://github.com/cryptocoinjs/ecurve/blob/master/lib/ecurve.js) on the Ellipitical Curve. 


#### toString()

Returns the string representation of the private key.

```js
var ECKey = require('eckey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";
var key = new ECKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);

console.log(key.toString()) // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd
```



References
----------
- http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
- https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/eckey.js
- https://github.com/vbuterin/bitcoinjs-lib/blob/master/src/eckey.js


[eckey]: https://github.com/cryptocoinjs/eckey
[coinstring]: https://github.com/cryptocoinjs/coinstring





