import { mkdirSync, writeFileSync } from 'fs'
import ts from 'typescript'
import { join, dirname } from 'path'
import { sync as rimrafSync } from 'rimraf'
import * as url from 'url'
import { sync as globSync } from 'glob'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const { readJsonConfigFile, sys, parseJsonSourceFileConfigFileContent, createCompilerHost, createProgram } = ts

const rootDir = join(__dirname, '..')
const srcFile = join(rootDir, 'src/ts/index.ts')

const tsConfigPath = join(rootDir, 'tsconfig.json')

const configFile = readJsonConfigFile(tsConfigPath, (file) => {
  return sys.readFile(file)
})

const tsConfig = parseJsonSourceFileConfigFileContent(configFile, sys, dirname(tsConfigPath))

export const compile = (outDir) => {
  const compilerOptions = {
    ...tsConfig.options,
    removeComments: false,
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    outDir
  }

  const host = createCompilerHost(compilerOptions)

  host.writeFile = (fileName, contents) => {
    mkdirSync(dirname(fileName), { recursive: true })
    writeFileSync(fileName, contents)
  }

  // Clear the types dir
  rimrafSync(outDir)

  // Prepare and emit the d.ts files
  const program = createProgram([srcFile], compilerOptions, host)
  program.emit()
}

export function compileDts () {
  const tmpDeclarationsDir = join(rootDir, '.types')
  return {
    name: 'compile-dts',
    sequential: true,
    order: 'pre',
    buildStart () {
      compile(tmpDeclarationsDir)
      return null
    },
    buildEnd () {
      rimrafSync(tmpDeclarationsDir)
    },
    resolveId (source) {
      if (source === join(rootDir, 'src', 'ts', 'index.ts')) {
        const filenames = globSync('src/**/*.ts', { cwd: rootDir, matchBase: true, ignore: ['src/**/*.spec.ts', 'src/**/*.test.ts'] })
        for (const file of filenames) {
          this.addWatchFile(file)
        }
        return join(tmpDeclarationsDir, 'index.d.ts')
      }
      return null // other ids should be handled as usually
    }
  }
}
