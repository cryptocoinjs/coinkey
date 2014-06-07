next version / 2014-06-xx
-------------------------
* added `mochify` as a dev dep
* removed semicolons per http://cryptocoinjs.com/about/contributing/#semicolons
* removed `terst` and moved to `assert`
* upgraded `"eckey": "~0.4.0"` to `"eckey": "^0.6.0"`
* deleted fields `pubKeyHash` and alias `publicHash` because they're now present in inherited `ECKey`
* upgraded `"coinstring": "~0.2.0"` to `"coinstring": "^1.0.1"`
* upgraded `"secure-random": "~0.2.0"` to `"secure-random": "^1.0.0"`
* removed `CoinKey.compressByDefault`, default is now `true`

0.1.0 / 2014-03-10
------------------
* added method `fromWif()`
* upgraded to `coinstring@0.2.x` => `decode()` method changed
* fixed bug when bytes wasn't passed, it should generate a private key 

0.0.1 / 2014-03-09
------------------
* initial release

