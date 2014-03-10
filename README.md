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

### Common Use Cases



### API

#### CoinKey([bytes], [compressed], [versions])

Constructor function.

- **bytes**: The private key bytes. Must be 32 bytes in length. Should be an `Array`, `Uint8Array`, or a `Buffer`. If not passed, one will be randomlyl generated.
- **compressed**: Specify whether the key should be compressed or not.
- **versions**: An object that specifies the public and private key versions for addresses and wifs. Defaults to Bitcoin `mainnet`.

```js
var CoinKey = require('coinkey');
var secureRandom = require('secure-random'); 

var bytes = secureRandom(32); //https://github.com/jprichardson/secure-random
var key1 = new ECKey(bytes);
var key2 = ECKey(bytes); //<--- can also use without "new"
var compressedKey = new ECKey(bytes, true);
```


#### compressed

Inherited from [ECKey][eckey]. [eckey.compressed](https://github.com/cryptocoinjs/eckey#compressed)


#### privateKey

Inherited from [ECKey][eckey]. [eckey.privateKey](https://github.com/cryptocoinjs/eckey#privatekey)


#### privateExportKey

Inherited from [ECKey][eckey]. [eckey.privateExportKey](https://github.com/cryptocoinjs/eckey#privateexportkey)


#### privateWif

Get the private WIF (Wallet Import Format).

```js
var CoinKey = require('coinkey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

//Bitcoin WIF
var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.privateWif) // => 5Hx15HFGyep2CfPxsJKe2fXJsCVn5DEiyoeGGF6JZjGbTRnqfiD

//Litecoin WIF
var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false, {private: 0xB0, public: 0x30});
console.log(key.privateWif) // => 6uFjYQnot5Gtg3HpP87bp4JUpg4FH1gkkV3RyS7LHBbD9Hpt1na
```


#### publicKey

Inherited from [ECKey][eckey]. [eckey.publicKey](https://github.com/cryptocoinjs/eckey#publickey)


#### publicAddress

Get the public address.

```js
var CoinKey = require('coinkey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

//Bitcoin Address
var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.publicAddress) // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS

//Litecoin Address
var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false, {private: 0xB0, public: 0x30});
console.log(key.publicAddress) // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS
```


#### publicHash

Alias: `pubKeyHash`

Get the public hash i.e. the ripemd160(sha256(publicKey))

```js
var CoinKey = require('coinkey');
var conv = require('binstring');

var privateKeyHex = "1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd";

var key = new CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), false);
console.log(key.publicHash.toString('hex')) // => 3c176e659bea0f29a3e9bf7880c112b1b31b4dc8
console.log(key.publKeyHash.toString('hex')) // => 3c176e659bea0f29a3e9bf7880c112b1b31b4dc8

var keyCompressed = CoinKey(conv(privateKeyHex, {in: 'hex', out: 'buffer'}), true);
console.log(key.publicHash.toString('hex')) // => a1c2f92a9dacbd2991c3897724a93f338e44bdc1
console.log(key.publKeyHash.toString('hex')) // => a1c2f92a9dacbd2991c3897724a93f338e44bdc1
```


#### publicPoint

Inherited from [ECKey][eckey]. [eckey.publicPoint](https://github.com/cryptocoinjs/eckey#publicpoint)


#### toString()

Returns the string representation of the private key.




References
----------
- http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
- https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/eckey.js
- https://github.com/vbuterin/bitcoinjs-lib/blob/master/src/eckey.js


[eckey]: https://github.com/cryptocoinjs/eckey
[coinstring]: https://github.com/cryptocoinjs/coinstring





