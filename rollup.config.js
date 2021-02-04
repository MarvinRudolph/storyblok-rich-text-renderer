import path from 'path'
import esbuild from 'rollup-plugin-esbuild'
import nodeResolve from '@rollup/plugin-node-resolve'
const { targets: allTargets, packagesDir } = require('./scripts/utils')

const plugins = [nodeResolve({ preferBuiltins: true }), esbuild()]

const packageConfigs = process.env.ROLLUP_WATCH
  ? createDevConfig()
  : createProdConfig()

function createProdConfig() {
  const packageDir = path.resolve(packagesDir, process.env.TARGET)
  const resolve = (p) => path.resolve(packageDir, p)
  const pkg = require(resolve('package.json'))
  const name = path.basename(packageDir)
  const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Marvin Rudolph
  * @license MIT
  */`

  const formats = ['cjs', 'esm']
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]

  return formats.map((format) => ({
    input: resolve('src/index.ts'),
    output: {
      file: resolve(`dist/${name}.${format}.js`),
      format,
      banner,
    },
    external,
    plugins,
  }))
}

function createDevConfig() {
  const configs = allTargets.map((target) => {
    const packageDir = path.resolve(packagesDir, target)
    const resolve = (p) => path.resolve(packageDir, p)
    const pkg = require(resolve('package.json'))
    const format = 'cjs'
    const external = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ]

    return {
      input: resolve('src/index.ts'),
      output: {
        file: resolve(`dist/${target}.${format}.js`),
        format,
      },
      plugins,
      external,
    }
  })

  return configs
}

export default packageConfigs
