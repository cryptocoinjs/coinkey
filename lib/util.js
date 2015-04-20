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

module.exports = {
  clone: clone,
  isArrayish: isArrayish,
  normalizeVersions: normalizeVersions
}
