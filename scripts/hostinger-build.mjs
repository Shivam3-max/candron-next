import { spawnSync } from 'node:child_process'

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function run(args) {
  return spawnSync(npm, args, { stdio: 'inherit', env: process.env }).status ?? 1
}

console.log('Preparing the optional CANDRON inventory database...')
const initialized = run(['run', 'db:init'])

if (initialized === 0) {
  const seeded = run(['run', 'catalog:seed', '--', '--once'])
  if (seeded !== 0) {
    console.warn('Catalog seeding was skipped because the database is unavailable. Continuing deployment with empty inventory.')
  }
} else {
  console.warn('Database initialization was skipped because MySQL is unavailable or not configured. Continuing deployment with empty inventory.')
}

console.log('Building the CANDRON website...')
const built = run(['run', 'build'])
process.exit(built)
