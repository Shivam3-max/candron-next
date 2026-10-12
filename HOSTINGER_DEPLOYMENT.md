# CANDRON Inventory Deployment on Hostinger

The catalog is a server-rendered Next.js application backed by Hostinger MySQL. Admin uploads are stored in MySQL, while the initial reference catalog keeps its source image URLs in MySQL so every product gallery can be seeded without duplicating large image files.

## 1. Hosting requirements

- Hostinger Business Web Hosting, Cloud Hosting, or a VPS with Node.js support.
- Node.js 22 is recommended.
- A Hostinger MySQL database and database user.
- The project in a GitHub repository (recommended) or a deployment ZIP.

## 2. Create the MySQL database

In hPanel, create a database and user under **Databases → MySQL Databases**. Keep the database host, port, name, user, and password.

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
REFERENCE_CATALOG_URL=https://store.maddox.com/collections/all-products/products.json?limit=250
```

Generate the session secret locally:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## 4. Hostinger build settings

- Framework: **Next.js**
- Node.js: **22.x**
- Install command: `npm ci`
- Build command: `npm run hostinger:build`
- Start command: `npm start`

`hostinger:build` runs these steps in order:

```text
npm run db:init
npm run catalog:import -- --once
npm run build
```

The importer records `reference-catalog-v1` in the MySQL `deployment_tasks` table only after a successful import. The first deployment imports the 32 reference product families and their image galleries. Every later deployment sees the completed marker, skips the import, and preserves CANDRON Admin changes. A database lock prevents two simultaneous deployments from importing twice.

To recover missing products manually without overwriting existing admin edits, use:

```text
npm run catalog:import
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
