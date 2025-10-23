import { Application } from 'express'
import path from 'path'
import { globbySync } from 'globby'
import { NODE_ENV } from './constants.js'

// Search for all files in the src directory that end with .express.ts or .express.js and import them into the app as express resolvers
export async function initializeExpressResolvers (app: Application): Promise<void> {
  const basePath = NODE_ENV === 'production' ? '.' : 'src'
  const resolversPaths = globbySync([`${basePath}/**/*.express.(j|t)s`]).sort((a, b) => a.localeCompare(b))
  const cwd = process.cwd()

  await Promise.all(resolversPaths
    .map(async (file) => {
      const importResult = await import('file://' + path.resolve(cwd, file))
      importResult.default(app)
    })
  )

  console.log('Express resolvers initialized')
}
