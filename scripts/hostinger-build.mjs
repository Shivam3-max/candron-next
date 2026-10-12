import { spawnSync } from 'node:child_process'

function runNode(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env })
  if (result.error) console.error(`Unable to start ${args.join(' ')}:`, result.error.message)
  return result.status ?? 1
}

console.log('Preparing the optional CANDRON inventory database...')
const envArgs = ['--env-file-if-exists=.env.local']
const initialized = runNode([...envArgs, 'scripts/init-db.mjs'])

if (initialized === 0) {
  const seeded = runNode([...envArgs, 'scripts/seed-catalog.mjs', '--once'])
  if (seeded !== 0) {
    console.warn('Catalog seeding was skipped because the database is unavailable. Continuing deployment with empty inventory.')
  }
} else {
  console.warn('Database initialization was skipped because MySQL is unavailable or not configured. Continuing deployment with empty inventory.')
}

console.log('Building the CANDRON website...')
const built = runNode(['node_modules/next/dist/bin/next', 'build', '--webpack'])
process.exit(built)
