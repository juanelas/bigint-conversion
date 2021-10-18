'use strict'

import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import typescriptPlugin from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

import { join } from 'path'
import { existsSync } from 'fs-extra'
import { directories, name as _name, dependencies, peerDependencies, exports } from '../package.json'
import { compile } from './rollup-plugin-dts.js'

const rootDir = join(__dirname, '..')
const dstDir = join(rootDir, directories.dist)
const srcDir = join(rootDir, 'src', 'ts')

function camelise (str) {
  return str.replace(/-([a-z])/g,
    function (m, w) {
      return w.toUpperCase()
    })
}

const regex = /^(?:(?<scope>@.*?)\/)?(?<name>.*)/ // We are going to take only the package name part if there is a scope, e.g. @my-org/package-name
const { name } = _name.match(regex).groups
const pkgCamelisedName = camelise(name)

const input = join(srcDir, 'index.ts')
if (existsSync(input) !== true) throw new Error('The entry point should be index.ts')

const tsBundleOptions = {
  tsconfig: join(rootDir, 'tsconfig.json'),
  outDir: undefined, // ignore outDir in tsconfig.json
  exclude: ['test/**/*', 'src/**/*.spec.ts', './build/typings/global-this-pkg.d.ts']
}

const external = [...Object.keys(dependencies || {}), ...Object.keys(peerDependencies || {})]

const sourcemapOutputOptions = {
  sourcemap: 'inline',
  sourcemapExcludeSources: true
}

// function moveDirPlugin (srcDir, dstDir) {
//   return {
//     name: 'move-dir',
//     closeBundle () {
//       removeSync(dstDir)
//       moveSync(srcDir, dstDir, { overwrite: true })
//     }
//   }
// }

function compileDts () {
  return {
    name: 'compile-dts',
    closeBundle () {
      compile()
    }
  }
}

export default [
  { // ESM for browsers and declarations
    input: input,
    output: [
      {
        file: join(rootDir, exports['.'].default),
        ...sourcemapOutputOptions,
        format: 'es'
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: true,
        preventAssignment: true
      }),
      typescriptPlugin(tsBundleOptions),
      compileDts()
    ],
    external
  },
  { // Browser bundles
    input: input,
    output: [
      {
        file: join(dstDir, 'bundles/iife.js'),
        format: 'iife',
        name: pkgCamelisedName,
        plugins: [terser()]
      },
      {
        file: join(dstDir, 'bundles/esm.js'),
        ...sourcemapOutputOptions,
        format: 'es'
      },
      {
        file: join(dstDir, 'bundles/esm.min.js'),
        format: 'es',
        plugins: [terser()]
      },
      {
        file: join(dstDir, 'bundles/umd.js'),
        format: 'umd',
        name: pkgCamelisedName,
        plugins: [terser()]
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: true,
        preventAssignment: true
      }),
      typescriptPlugin(tsBundleOptions),
      resolve({
        browser: true,
        exportConditions: ['browser', 'module', 'import', 'default']
      })
    ]
  },
  { // Node
    input: input,
    output: [
      {
        file: join(rootDir, exports['.'].node.require),
        ...sourcemapOutputOptions,
        format: 'cjs'
      },
      {
        file: join(rootDir, exports['.'].node.import),
        ...sourcemapOutputOptions,
        format: 'es'
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: false,
        preventAssignment: true
      }),
      typescriptPlugin(tsBundleOptions),
      commonjs({ extensions: ['.js', '.cjs', '.ts', '.jsx', '.cjsx', '.tsx'] }) // the ".ts" extension is required
    ],
    external
  }
]
