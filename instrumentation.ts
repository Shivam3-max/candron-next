export async function register() {
  // Build already runs these steps (scripts/hostinger-build.mjs); only bootstrap a running server
  if (process.env.NEXT_RUNTIME !== 'nodejs' || process.env.NEXT_PHASE === 'phase-production-build') return
  const { bootstrapDatabase } = await import('./lib/db-bootstrap')
  await bootstrapDatabase()
}
