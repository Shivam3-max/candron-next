# CANDRON Inventory Deployment on Hostinger

The catalog is a server-rendered Next.js application backed by Hostinger MySQL. Inventory is entered by the CANDRON team through `/admin`. Product photos are stored in MySQL as uploads, and only photos of visible products are public. The only bundled record is one CANDRON demo item in `database/catalog-seed.json`; its photos (CANDRON's own project photos) are loaded into MySQL by the seed like any upload. Products without photos show a line drawing of their category. Deployment and runtime do not depend on an external catalog service.

## 1. Hosting requirements

- Hostinger Business Web Hosting, Cloud Hosting, or a VPS with Node.js support.
- Node.js 22 is recommended.
- A Hostinger MySQL database and database user.
- The project in a GitHub repository (recommended) or a deployment ZIP.

## 2. Create the MySQL database

In hPanel, create a database and user under **Databases → MySQL Databases**. Keep the database host, port, name, user, and password.

For `DB_HOST`, use the host hPanel shows for the database. If the Node.js app runs on the same hosting plan this is usually `localhost`; if the app cannot connect, use the remote MySQL hostname from hPanel and allow the app's IP under **Remote MySQL**.

## 3. Configure environment variables

Add these in the Hostinger Node.js application settings. Do not commit real secrets.

```text
DB_HOST=<Hostinger MySQL host>
DB_PORT=3306
DB_NAME=<database name>
DB_USER=<database user>
DB_PASSWORD=<database password>
DB_SSL=false
DB_CONNECTION_LIMIT=8
ADMIN_SESSION_SECRET=<at least 32 random characters>
ADMIN_EMAIL=<initial administrator email>
ADMIN_PASSWORD=<initial administrator password, at least 12 characters>
RESEND_API_KEY=<Resend API key — without it the contact form returns "Email service is unavailable">
CONTACT_FROM_EMAIL=<sender on a domain verified in Resend, e.g. website@candron.com>
```

`ADMIN_EMAIL` is the only administrator account: on every start, any other admin row is deleted. Changing `ADMIN_PASSWORD` (or `ADMIN_EMAIL`) and restarting signs out every existing admin session; restarting with the same values does not.

Generate the session secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 4. Hostinger build settings

- Framework: **Next.js**
- Node.js: **22.x**
- Install command: `npm ci`
- Build command: `npm run build`
- Start command: `npm start`

The standard `build` command runs these steps in order:

```text
npm run db:init
npm run catalog:seed -- --once
npm run build:next
```

If MySQL is unreachable during the build (Hostinger's build container often cannot reach the database, or does not receive the environment variables), the first two steps are skipped with a warning and the build still succeeds.

The same two steps therefore also run **every time the server starts** (`instrumentation.ts` → `lib/db-bootstrap.ts`), where the runtime database is reachable. Both are idempotent: tables are created only if missing, the administrator password is re-applied from `ADMIN_PASSWORD`, and the catalog seed runs only once. After a deploy, check the application's runtime logs for:

```text
Database initialized. Administrator ready: <ADMIN_EMAIL>
One-time local catalog seed complete: 32 available, 32 added, ...   (first deploy)
Catalog seed skipped: candron-catalog-seed-v1 already completed ...  (later deploys)
```

If you instead see `[db-bootstrap] Database initialization failed`, the `DB_*` or `ADMIN_*` variables are wrong or missing.

`npm run hostinger:build` remains available as an alias for the same deployment workflow.

The seeder runs the one-time task `candron-catalog-reset-v2` and records it in the MySQL `deployment_tasks` table after it succeeds. On the first deployment it:

- removes the 32 legacy imported listings (matched by their original URL slugs), and
- adds the CANDRON demo item if no product already uses its slug or item code.

Products created in CANDRON Admin are never modified or deleted. Later deployments see the completed marker and skip the task. A database lock prevents two simultaneous deployments from running it twice. `npm run db:init` also adds any missing inventory columns (status, dimensions, highlights, documents and so on) to an existing `products` table without touching data.

To re-add the demo item manually, for example after deleting it, use:

```text
npm run catalog:seed
```

## 5. First login

After deployment, visit:

```text
https://candron.com/admin/login
```

Use `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Change `ADMIN_PASSWORD` in Hostinger and redeploy to rotate the administrator password.

## 6. Catalog URLs

- Public inventory: `/inventory`
- Product detail: `/inventory/<product-slug>`
- Administration: `/admin`

## Operational notes

- Accepted product images: JPG, PNG, WebP, or GIF, maximum 5 MB each.
- Administrator cookies are HTTP-only, same-site strict, and secure in production.
- Login attempts are rate-limited per forwarded IP.
- Back up the MySQL database from hPanel on a regular schedule.
- Never add `.env` or database credentials to Git.
