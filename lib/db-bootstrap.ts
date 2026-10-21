import { spawn } from 'node:child_process'
import path from 'node:path'
import { isDatabaseConfigured } from '@/lib/db'

// Hostinger's build container may not reach MySQL (or see the env vars), so the
// build-time init can be skipped. Re-run the same idempotent scripts at server
// start, where the runtime database is reachable: schema, admin upsert, one-time seed.
function runScript(args: string[]) {
  return new Promise<number>(resolve => {
    const child = spawn(process.execPath, [path.join(process.cwd(), 'scripts', args[0]), ...args.slice(1)], {
      env: process.env,
      stdio: 'inherit',
    })
    child.on('error', error => {
      console.error(`[db-bootstrap] Unable to start ${args[0]}:`, error.message)
      resolve(1)
    })
    child.on('exit', code => resolve(code ?? 1))
  })
}

export async function bootstrapDatabase() {
  if (!isDatabaseConfigured()) {
    console.warn('[db-bootstrap] DB_HOST/DB_USER/DB_NAME not set. Inventory and admin are disabled.')
    return
  }
  if ((await runScript(['init-db.mjs'])) !== 0) {
    console.error('[db-bootstrap] Database initialization failed. Check the DB_* and ADMIN_* environment variables.')
    return
  }
  if ((await runScript(['seed-catalog.mjs', '--once'])) !== 0) {
    console.error('[db-bootstrap] Catalog seed failed. Run "npm run catalog:seed" once the database is reachable.')
  }
}
