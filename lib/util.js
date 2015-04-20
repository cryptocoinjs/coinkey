// poor man's clone
function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isArrayish (maybeArray) {
  return Array.isArray(maybeArray)
    || (maybeArray instanceof Uint8Array)
    || Buffer.isBuffer(maybeArray)
}

module.exports = {
  clone: clone,
  isArrayish: isArrayish
}
