// poor man's clone
function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function isArrayish (maybeArray) {
  return Array.isArray(maybeArray)
    || (maybeArray instanceof Uint8Array)
    || Buffer.isBuffer(maybeArray)
}

// versions === { private, public } ? if no, check '.version(s)'
function normalizeVersions (versions) {
  if (!versions) return null
  if (typeof versions !== 'object') return null
  versions = clone(versions)
  if (versions.version) versions.versions = versions.version
  // check for actual versions object
  if (versions && 'private' in versions) return versions
  // if it exists, maybe in .versions?
  else versions = versions.versions
  if (versions && 'private' in versions) return versions
  else return null
}

function bufferizeVersion (version) {
  if (typeof version !== 'string' && typeof version !== 'number')
    throw new Error('invalid version type.')

  if (typeof version === 'string') {
    return hexStringToBuffer(version)
  } else if (typeof version === 'number') {
    // expects BE uint
    return beUIntToBuffer(version)
  }
}

function isValidHexString (input) {
  var re = /^(0x)?([\dA-Fa-f]{2})+$/g
  return re.test(input)
}

function hexStringToBuffer (input) {
  if (!isValidHexString(input)) throw new Error('invalid hex string.')
  // omit 0x for buffer
  var re = /([\dA-Fa-f]{2})+$/g
  const sanitizedInput = input.match(re)[0]
  return new Buffer(sanitizedInput, 'hex')
}

function beUIntToBuffer (num) {
  var length
  if (num === 0) length = 1
  else if (num > 0) length = Math.ceil((Math.log(num + 1) / Math.log(2)) / 8)
  var buf = new Buffer(length)
  buf.writeUIntBE(num, 0, length)

  return buf
}

module.exports = {
  clone: clone,
  isArrayish: isArrayish,
  normalizeVersions: normalizeVersions,
  bufferizeVersion: bufferizeVersion
}
