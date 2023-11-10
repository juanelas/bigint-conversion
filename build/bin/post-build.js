const fs = require('fs')
const path = require('path')
const rootDir = path.join(__dirname, '../..')
const pkgJson = require(path.join(rootDir, 'package.json'))

const esmPackageJson = path.join(rootDir, path.dirname(pkgJson.exports['.'].node.import.default), 'package.json')
const cjsPackageJson = path.join(rootDir, path.dirname(pkgJson.exports['.'].node.require.default), 'package.json')

fs.writeFileSync(esmPackageJson, JSON.stringify({ type: 'module' }), { encoding: 'utf-8' })
fs.writeFileSync(cjsPackageJson, JSON.stringify({ type: 'commonjs' }), { encoding: 'utf-8' })
