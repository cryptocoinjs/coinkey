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
  var length
  if (version === 0 || version === 1) length = 1
  else if (version > 1) length = Math.ceil((Math.log(version) / Math.log(2)) / 8)
  var buf = new Buffer(length)
  buf.writeUIntBE(version, 0, length)
  return buf
}

module.exports = {
  clone: clone,
  isArrayish: isArrayish,
  normalizeVersions: normalizeVersions,
  bufferizeVersion: bufferizeVersion
}
