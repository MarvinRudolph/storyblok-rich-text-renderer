const path = require('path')
const fse = require('fs-extra')

const packagesDir = path.resolve(__dirname, '../packages')

exports.packagesDir = packagesDir

exports.targets = fse.readdirSync(packagesDir).filter((f) => {
  const pkg = require(path.resolve(packagesDir, f, 'package.json'))

  if (pkg.private) {
    return false
  }

  return true
})
