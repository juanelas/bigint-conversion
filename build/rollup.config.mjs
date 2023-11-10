'use strict'

import commonjs from '@rollup/plugin-commonjs'
import inject from '@rollup/plugin-inject'
import json from '@rollup/plugin-json'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import rollupPluginTs from '@rollup/plugin-typescript'
import { existsSync, readFileSync } from 'fs'
import { builtinModules } from 'module'
import { join } from 'path'
import dts from 'rollup-plugin-dts'
import { compileDts } from './my-rollup-plugin-dts.mjs'

import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const rootDir = join(__dirname, '..')
const pkgJson = JSON.parse(readFileSync(join(rootDir, 'package.json')))
const pkgJsonLock = JSON.parse(readFileSync(join(rootDir, 'package-lock.json')))
const srcDir = join(rootDir, 'src', 'ts')

const tsConfigPath = join(rootDir, 'tsconfig.json')

function camelise (str) {
  return str.replace(/-([a-z])/g,
    function (m, w) {
      return w.toUpperCase()
    })
}

function isDevDependency (moduleName) {
  const packageEntry = pkgJsonLock.packages['node_modules/' + moduleName]
  return (packageEntry ?? {}).dev === true
}

const regex = /^(?:(?<scope>@.*?)\/)?(?<name>.*)/ // We are going to take only the package name part if there is a scope, e.g. @my-org/package-name
const { name } = pkgJson.name.match(regex).groups
const pkgCamelisedName = camelise(name)

const input = join(srcDir, 'index.ts')
if (existsSync(input) !== true) throw new Error('The entry point should be index.ts')

const tsPluginOptions = {
  tsconfig: tsConfigPath,
  outDir: undefined,
  include: ['src/ts/**/*', 'build/typings/**/*.d.ts'],
  exclude: ['src/**/*.spec.ts', 'src/**/*.test.ts']
}

function resolveOnly (module) { // if a dev dependency is imported we will resolve it so that the dist modules always work
  const moduleNameMatch = module.match(/^(?:@[a-z0-9_-]+\/)?(?:node:)?[a-z0-9_-]+/)
  if (moduleNameMatch === null || moduleNameMatch.length !== 1) {
    return false
  }
  const moduleName = moduleNameMatch[0].replace(/^node:/, '')
  // don't resolve if it is a native module
  if (builtinModules.includes(moduleName)) {
    return false
  }

  if (isDevDependency(moduleName)) {
    console.warn(`\x1b[33m⚠ WARM: dev dependency \x1b[0m${module}\x1b[33m being bundled. Should it be a dependency instead?\x1b[0m`)
    return true
  }

  return false
}

export default [
  { // Browser ESM
    input,
    output: [
      {
        file: join(rootDir, pkgJson.exports['.'].default.default),
        format: 'es',
        sourcemap: true,
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: true,
        environment: 'browser',
        _MODULE_TYPE: "'ESM'",
        _NPM_PKG_VERSION: `'${process.env.npm_package_version}'` ?? "'0.0.1'",
        preventAssignment: true
      }),
      rollupPluginTs(tsPluginOptions),
      commonjs({ extensions: ['.js', '.jsx'] }),
      json(),
      resolve({
        browser: true,
        exportConditions: ['browser', 'default'],
        mainFields: ['browser', 'module', 'main'],
        resolveOnly
      })
    ]
  },
  { // Browser bundles
    input,
    output: [
      {
        file: join(rootDir, pkgJson.exports['./esm-browser-bundle-nomin']),
        format: 'es',
        sourcemap: true
      },
      {
        file: join(rootDir, pkgJson.exports['./esm-browser-bundle']),
        format: 'es',
        sourcemap: true,
        plugins: [terser()]
      },
      {
        file: join(rootDir, pkgJson.exports['./iife-browser-bundle']),
        format: 'iife',
        name: pkgCamelisedName,
        plugins: [terser()]
      },
      {
        file: join(rootDir, pkgJson.exports['./umd-browser-bundle']),
        format: 'umd',
        name: pkgCamelisedName,
        plugins: [terser()]
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: true,
        environment: 'browser',
        _MODULE_TYPE: "'BUNDLE'",
        _NPM_PKG_VERSION: `'${process.env.npm_package_version}'` ?? "'0.0.1'",
        preventAssignment: true
      }),
      rollupPluginTs({
        ...tsPluginOptions
      }),
      commonjs({ extensions: ['.js', '.jsx'] }),
      json(),
      resolve({ browser: true })
    ]
  },
  { // Node ESM
    input,
    output: [
      {
        file: join(rootDir, pkgJson.exports['.'].node.import.default),
        format: 'es',
        sourcemap: true,
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      replace({
        IS_BROWSER: false,
        environment: 'nodejs',
        _MODULE_TYPE: "'ESM'",
        _NPM_PKG_VERSION: `'${process.env.npm_package_version}'` ?? "'0.0.1'",
        __filename: 'fileURLToPath(import.meta.url)',
        __dirname: 'fileURLToPath(new URL(\'.\', import.meta.url))',
        preventAssignment: true
      }),
      rollupPluginTs(tsPluginOptions),
      inject({
        crypto: ['crypto', 'webcrypto'],
        fileURLToPath: ['url', 'fileURLToPath']
      }),
      commonjs({ extensions: ['.js', '.jsx'] }),
      json(),
      resolve({
        exportConditions: ['node'],
        resolveOnly
      })
    ]
  },
  { // Node CJS
    input,
    output: [
      {
        file: join(rootDir, pkgJson.exports['.'].node.require.default),
        format: 'cjs',
        exports: 'auto',
        interop: 'auto',
        dynamicImportInCjs: false,
        sourcemap: true,
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      // replace({
      //   'await import(': 'require(',
      //   delimiters: ['', ''],
      //   preventAssignment: true
      // }),
      replace({
        IS_BROWSER: false,
        environment: 'nodejs',
        _MODULE_TYPE: "'CJS'",
        _NPM_PKG_VERSION: `'${process.env.npm_package_version}'` ?? "'0.0.1'",
        preventAssignment: true
      }),
      rollupPluginTs(tsPluginOptions),
      inject({
        crypto: ['crypto', 'webcrypto']
      }),
      commonjs({ extensions: ['.js', '.jsx'] }),
      json(),
      resolve({
        exportConditions: ['node'],
        resolveOnly
      })
    ]
  },
  { // a bundle of declarations to index.d.ts
    input,
    output: [{ file: join(rootDir, pkgJson.types), format: 'es' }],
    plugins: [
      compileDts(),
      dts({
        respectExternal: true
      })
    ],
    external: (module) => {
      if (/^[./]/.test(module)) {
        return false
      }
      return !resolveOnly(module)
    }
  }
]
