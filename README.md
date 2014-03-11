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

### Generate a Bunch of Bitcoin Keys/Addresses

```js
var CoinKey = require('coinkey');

var bitcoinAddresses = [];

for (var i = 0; i < 10; ++i) {
  bitcoinAddresses.push(new CoinKey()); //Bitcoin supported by default
}
```


#### Generate a Bunch of Namecoin Keys/Addresses

```js
var CoinKey = require('coinkey');
var ci = require('coininfo');

var namecoins = [];
for (var i = 0; i < 10; ++i) {
  namecoins.push(new CoinKey(ci('NMC').versions));
}
```


#### Parse a Wallet Import Key and Determine Crypto Currency

```js
var CoinKey = require('coinkey');
var ci = require('coininfo');

var ck = CoinKey.fromWif('QVD3x1RPiWPvyxbTsfxVwaYLyeBZrQvjhZ2aZJUsbuRgsEAGpNQ2');

console.log(ck.privateKey.toString('hex')) // => c4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a
console.log(ck.publicAddress) // => DGG6AicS4Qg8Y3UFtcuwJqbuRZ3Q7WtYXv
console.log(ck.compressed) // => true
console.log(ck.versions.public === ci('DOGE').versions.public) // => true
```

#### Change to Testnet Later

```js
var CoinKey = require('coinkey');
var ci = require('coininfo');

var ck = new CoinKey(new Buffer('1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd', 'hex'));
console.log(ck.publicAddress); // => 16UjcYNBG9GTK4uq2f7yYEbuifqCzoLMGS

//change to Testnet
ck.versions = ci('TEST');

console.log(ck.publicAddress); // => mkzgubTA5Ahi6BPSkE6MN9pEafRutznkMe
```


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
var key2 = CoinKey(bytes); //<--- can also use without "new"
var compressedKey = new CoinKey(bytes, true);
```


### Properties


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


### Methods

#### fromWif(wif, [versions])

Class method to create a `CoinKey` from a wif.

```js
var ck = CoinKey.fromWif('KwomKti1X3tYJUUMb1TGSM2mrZk1wb1aHisUNHCQXTZq5auC2qc3');
console.log(ck.compressed); // => true
console.log(ck.privateKey.toString('hex')) // => 1184cd2cdd640ca42cfc3a091c51d549b2f016d454b2774019c2b2d2e08529fd
console.log(ck.publicAddress); // => 1FkKMsKNJqWSDvTvETqcCeHcUQQ64kSC6s
```


Browser Support
---------------

Clone the repo:

    git clone https://github.com/cryptocoinjs/coinkey

Install Browserify

    npm install -g browserify

Nav to repo:

    cd coinkey

Install dependencies:

    npm install

Run browserify:

    browserify --standalone coinkey < lib/coinkey.js > lib/coinkey.bundle.js

You can now drop `coinkey.bundle.js` in a `<script>` tag.



References
----------
- http://procbits.com/2013/08/27/generating-a-bitcoin-address-with-javascript
- https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/eckey.js
- https://github.com/vbuterin/bitcoinjs-lib/blob/master/src/eckey.js


[eckey]: https://github.com/cryptocoinjs/eckey
[coinstring]: https://github.com/cryptocoinjs/coinstring





