// Brings an existing products table up to the current inventory schema without losing data.
// Safe to run on every deploy: each column is added only when it is missing.

const COLUMNS = [
  ['status', "VARCHAR(30) NOT NULL DEFAULT 'Available' AFTER condition_name"],
  ['manufacturer', "VARCHAR(120) NOT NULL DEFAULT 'CANDRON' AFTER status"],
  ['year_built', 'SMALLINT UNSIGNED NULL AFTER manufacturer'],
  ['rating_unit', "VARCHAR(12) NOT NULL DEFAULT 'kVA' AFTER kva"],
  ['frequency', "VARCHAR(20) NOT NULL DEFAULT '' AFTER phase"],
  ['winding', "VARCHAR(40) NOT NULL DEFAULT '' AFTER frequency"],
  ['cooling', "VARCHAR(40) NOT NULL DEFAULT '' AFTER winding"],
  ['show_price', 'TINYINT(1) NOT NULL DEFAULT 1 AFTER price_max'],
  ['location', "VARCHAR(120) NOT NULL DEFAULT '' AFTER stock_quantity"],
  ['warranty', "VARCHAR(120) NOT NULL DEFAULT '' AFTER lead_time"],
  ['dim_height', 'DECIMAL(10,2) NULL AFTER warranty'],
  ['dim_width', 'DECIMAL(10,2) NULL AFTER dim_height'],
  ['dim_depth', 'DECIMAL(10,2) NULL AFTER dim_width'],
  ['dim_unit', "VARCHAR(4) NOT NULL DEFAULT 'in' AFTER dim_depth"],
  ['weight', 'DECIMAL(12,2) NULL AFTER dim_unit'],
  ['weight_unit', "VARCHAR(4) NOT NULL DEFAULT 'lb' AFTER weight"],
  ['highlights_json', 'JSON NULL AFTER weight_unit'],
  ['documents_json', 'JSON NULL AFTER highlights_json'],
]

export async function ensureInventorySchema(connection) {
  const [rows] = await connection.execute(
    `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'products'`,
  )
  const existing = new Map(rows.map(r => [r.COLUMN_NAME, r.DATA_TYPE]))
  let added = 0
  for (const [name, definition] of COLUMNS) {
    if (existing.has(name)) continue
    await connection.query(`ALTER TABLE products ADD COLUMN ${name} ${definition}`)
    added += 1
  }
  // Conditions are now a vocabulary in lib/inventory.ts rather than a fixed ENUM.
  if (existing.get('condition_name') === 'enum') {
    await connection.query("ALTER TABLE products MODIFY condition_name VARCHAR(30) NOT NULL DEFAULT 'New'")
  }
  if (added) console.log(`Inventory schema: added ${added} column(s).`)
}
