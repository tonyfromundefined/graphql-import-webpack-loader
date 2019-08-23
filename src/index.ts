import { importSchema, parseSDL } from 'graphql-import'
import { resolve, dirname } from 'path'
import { readFileSync } from 'fs'

export default function(source: string) {
  const callback = this.async()
  this.cacheable()

  addDependency(this.addDependency, source, this.resourcePath)

  callback(null, `module.exports = \`${importSchema(this.resourcePath).replace(/`/g, '\\`')}\``)
}

function addDependency(webpackAddDependency: any, source: string, sourcePath: string) {
  const modules = parseSDL(source)

  for (const module of modules) {
    const moduleSourcePath = resolve(dirname(sourcePath), module.from)
    const moduleSource = readFileSync(moduleSourcePath, 'utf-8')
  
    webpackAddDependency(moduleSourcePath)
  
    addDependency(webpackAddDependency, moduleSource, moduleSourcePath)  
  }
}
