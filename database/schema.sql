CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  password_salt CHAR(32) NOT NULL,
  session_nonce CHAR(32) NOT NULL DEFAULT '',
  added_by VARCHAR(190) NULL COMMENT 'Invited by the main admin; NULL = the ADMIN_EMAIL account',
  setup_token_hash CHAR(64) NULL COMMENT 'sha256 of the set-password link token',
  setup_expires DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admin_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS deployment_tasks (
  task_key VARCHAR(190) NOT NULL,
  result_json JSON NULL,
  completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (task_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(190) NOT NULL,
  sku VARCHAR(100) NOT NULL COMMENT 'CANDRON item code, e.g. CE-PMT-0500-001',
  name VARCHAR(255) NOT NULL,
  short_description VARCHAR(500) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  condition_name VARCHAR(30) NOT NULL DEFAULT 'New',
  status VARCHAR(30) NOT NULL DEFAULT 'Available',
  manufacturer VARCHAR(120) NOT NULL DEFAULT 'CANDRON',
  year_built SMALLINT UNSIGNED NULL,
  kva DECIMAL(12,2) NULL COMMENT 'Rating value; unit in rating_unit',
  rating_unit VARCHAR(12) NOT NULL DEFAULT 'kVA',
  input_voltage VARCHAR(80) NOT NULL DEFAULT '' COMMENT 'Primary / HV',
  output_voltage VARCHAR(80) NOT NULL DEFAULT '' COMMENT 'Secondary / LV',
  phase VARCHAR(40) NOT NULL DEFAULT '',
  frequency VARCHAR(20) NOT NULL DEFAULT '',
  winding VARCHAR(40) NOT NULL DEFAULT '',
  cooling VARCHAR(40) NOT NULL DEFAULT '',
  special_type VARCHAR(120) NOT NULL DEFAULT '' COMMENT 'Application, e.g. inverter duty',
  price_min DECIMAL(14,2) NULL,
  price_max DECIMAL(14,2) NULL,
  show_price TINYINT(1) NOT NULL DEFAULT 1,
  purchase_mode VARCHAR(12) NOT NULL DEFAULT 'quote' COMMENT 'quote | buy (online checkout)',
  deposit_percent DECIMAL(5,2) NULL COMMENT 'Unused since online deposits were dropped (deposits are on sales quotes)',
  custom_build TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Custom builds are always quote-only and final sale',
  pickup_yard VARCHAR(40) NOT NULL DEFAULT '' COMMENT 'Shop settings yard id; blank = no pickup offered',
  currency CHAR(3) NOT NULL DEFAULT 'CAD',
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  location VARCHAR(120) NOT NULL DEFAULT '',
  lead_time VARCHAR(120) NOT NULL DEFAULT '',
  warranty VARCHAR(120) NOT NULL DEFAULT '',
  dim_height DECIMAL(10,2) NULL,
  dim_width DECIMAL(10,2) NULL,
  dim_depth DECIMAL(10,2) NULL,
  dim_unit VARCHAR(4) NOT NULL DEFAULT 'in',
  weight DECIMAL(12,2) NULL,
  weight_unit VARCHAR(4) NOT NULL DEFAULT 'lb',
  highlights_json JSON NULL,
  documents_json JSON NULL,
  specs_json JSON NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_product_slug (slug),
  UNIQUE KEY uq_product_sku (sku),
  KEY idx_products_active_category (is_active, category),
  KEY idx_products_filter (condition_name, kva, input_voltage, output_voltage)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(80) NOT NULL,
  image_data MEDIUMBLOB NULL,
  external_url VARCHAR(2048) NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_product_images_product (product_id, sort_order),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Online ordering (Stripe) ─────────────────────────────────────────────
-- All times are UTC (DATETIME written with UTC_TIMESTAMP()).

CREATE TABLE IF NOT EXISTS shop_settings (
  setting_key VARCHAR(64) NOT NULL,
  value_json JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_number VARCHAR(24) NULL,
  access_token CHAR(43) NOT NULL COMMENT 'Lets the buyer open /order/<number> without an account',
  status VARCHAR(30) NOT NULL DEFAULT 'pending_payment',
  currency CHAR(3) NOT NULL DEFAULT 'CAD',
  subtotal DECIMAL(14,2) NOT NULL DEFAULT 0,
  freight DECIMAL(14,2) NOT NULL DEFAULT 0,
  freight_note VARCHAR(255) NOT NULL DEFAULT '',
  tax DECIMAL(14,2) NOT NULL DEFAULT 0,
  total DECIMAL(14,2) NOT NULL DEFAULT 0,
  amount_refunded DECIMAL(14,2) NOT NULL DEFAULT 0,
  customer_name VARCHAR(160) NOT NULL,
  company VARCHAR(160) NOT NULL DEFAULT '',
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(40) NOT NULL DEFAULT '',
  po_number VARCHAR(60) NOT NULL DEFAULT '',
  customer_notes TEXT NULL,
  fulfilment VARCHAR(12) NOT NULL DEFAULT 'delivery' COMMENT 'delivery | pickup',
  ship_line1 VARCHAR(200) NOT NULL DEFAULT '',
  ship_line2 VARCHAR(200) NOT NULL DEFAULT '',
  ship_city VARCHAR(120) NOT NULL DEFAULT '',
  ship_region VARCHAR(10) NOT NULL DEFAULT '',
  ship_postal VARCHAR(20) NOT NULL DEFAULT '',
  ship_country CHAR(2) NOT NULL DEFAULT 'CA',
  tracking_carrier VARCHAR(80) NOT NULL DEFAULT '',
  tracking_number VARCHAR(120) NOT NULL DEFAULT '',
  admin_notes TEXT NULL,
  payment_method VARCHAR(40) NOT NULL DEFAULT '',
  stripe_session_id VARCHAR(255) NULL,
  stripe_payment_intent VARCHAR(255) NULL,
  stripe_customer_id VARCHAR(255) NULL,
  live_mode TINYINT(1) NOT NULL DEFAULT 0,
  stock_released TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Stock returned after a failed payment or cancellation',
  quote_id BIGINT UNSIGNED NULL,
  payment_terms VARCHAR(12) NOT NULL DEFAULT 'pay_now' COMMENT 'pay_now | deposit | net',
  deposit_amount DECIMAL(14,2) NOT NULL DEFAULT 0 COMMENT 'Pre-tax amount charged as the deposit',
  amount_paid DECIMAL(14,2) NOT NULL DEFAULT 0 COMMENT 'Total collected incl. tax (checkout + invoices)',
  stripe_invoice_id VARCHAR(255) NULL,
  invoice_url VARCHAR(500) NOT NULL DEFAULT '',
  invoice_due DATE NULL,
  customer_id BIGINT UNSIGNED NULL,
  reminder_opt_in TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Buyer asked for a link if they leave the payment page',
  reminder_sent TINYINT(1) NOT NULL DEFAULT 0,
  pickup_yard VARCHAR(40) NOT NULL DEFAULT '',
  fx_rate DECIMAL(12,6) NULL COMMENT 'USD per CAD (incl. margin) used for US orders',
  hold_until DATETIME NULL COMMENT 'Orders above the online limit: stock held until',
  freight_status VARCHAR(12) NOT NULL DEFAULT '' COMMENT 'pending | invoiced | paid (CANDRON freight billed after the order)',
  freight_invoice_id VARCHAR(255) NULL,
  freight_invoice_url VARCHAR(500) NOT NULL DEFAULT '',
  balance_reminders TINYINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Deposit balance reminders sent',
  forfeit_flagged_at DATETIME NULL,
  paid_at DATETIME NULL,
  shipped_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_order_number (order_number),
  UNIQUE KEY uq_order_session (stripe_session_id),
  KEY idx_orders_status (status, created_at),
  KEY idx_orders_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NULL,
  sku VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(190) NOT NULL DEFAULT '',
  unit_price DECIMAL(14,2) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  line_total DECIMAL(14,2) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_items_order (order_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  event VARCHAR(40) NOT NULL,
  note VARCHAR(500) NOT NULL DEFAULT '',
  actor VARCHAR(190) NOT NULL DEFAULT 'system',
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_events_order (order_id, id),
  CONSTRAINT fk_order_events_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Units held while a buyer is on the Stripe payment page; ignored once expires_at passes
CREATE TABLE IF NOT EXISTS stock_holds (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_stock_holds_product (product_id, expires_at),
  KEY idx_stock_holds_order (order_id),
  CONSTRAINT fk_stock_holds_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_stock_holds_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stripe webhook events already handled (Stripe retries deliveries)
CREATE TABLE IF NOT EXISTS stripe_events (
  event_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(80) NOT NULL,
  received_at DATETIME NOT NULL,
  PRIMARY KEY (event_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Quotes (phase 2) ─────────────────────────────────────────────────────

-- "Request a quote" submissions from product pages, so the team can turn them into quotes
CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NULL,
  sku VARCHAR(100) NOT NULL DEFAULT '',
  product_name VARCHAR(255) NOT NULL DEFAULT '',
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  name VARCHAR(160) NOT NULL,
  company VARCHAR(160) NOT NULL DEFAULT '',
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(40) NOT NULL DEFAULT '',
  message TEXT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new' COMMENT 'new | quoted | closed',
  quote_id BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_quote_requests_status (status, id),
  CONSTRAINT fk_quote_requests_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quotes (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quote_number VARCHAR(24) NULL,
  access_token CHAR(43) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' COMMENT 'draft | sent | accepted | expired | cancelled',
  currency CHAR(3) NOT NULL DEFAULT 'CAD',
  customer_name VARCHAR(160) NOT NULL DEFAULT '',
  company VARCHAR(160) NOT NULL DEFAULT '',
  email VARCHAR(254) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  fulfilment VARCHAR(12) NOT NULL DEFAULT 'delivery',
  pickup_yard VARCHAR(40) NOT NULL DEFAULT '',
  ship_line1 VARCHAR(200) NOT NULL DEFAULT '',
  ship_line2 VARCHAR(200) NOT NULL DEFAULT '',
  ship_city VARCHAR(120) NOT NULL DEFAULT '',
  ship_region VARCHAR(10) NOT NULL DEFAULT '',
  ship_postal VARCHAR(20) NOT NULL DEFAULT '',
  ship_country CHAR(2) NOT NULL DEFAULT 'CA',
  freight DECIMAL(14,2) NOT NULL DEFAULT 0,
  freight_note VARCHAR(255) NOT NULL DEFAULT 'Freight',
  payment_terms VARCHAR(12) NOT NULL DEFAULT 'pay_now' COMMENT 'pay_now | deposit | net',
  deposit_percent DECIMAL(5,2) NOT NULL DEFAULT 25,
  net_days SMALLINT UNSIGNED NOT NULL DEFAULT 30,
  valid_until DATE NULL,
  message TEXT NULL COMMENT 'Shown to the customer (scope, lead time, terms)',
  internal_notes TEXT NULL,
  request_id BIGINT UNSIGNED NULL,
  order_id BIGINT UNSIGNED NULL,
  created_by VARCHAR(190) NOT NULL DEFAULT '',
  sent_at DATETIME NULL,
  accepted_at DATETIME NULL,
  created_at DATETIME NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_quote_number (quote_number),
  KEY idx_quotes_status (status, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quote_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quote_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NULL COMMENT 'Set when the line is an inventory unit (stock is reserved on acceptance)',
  sku VARCHAR(100) NOT NULL DEFAULT '',
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500) NOT NULL DEFAULT '',
  unit_price DECIMAL(14,2) NOT NULL,
  quantity INT UNSIGNED NOT NULL DEFAULT 1,
  line_total DECIMAL(14,2) NOT NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_quote_items_quote (quote_id, sort_order),
  CONSTRAINT fk_quote_items_quote FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
  CONSTRAINT fk_quote_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Customer accounts (phase 3) ──────────────────────────────────────────
-- Passwordless: customers sign in with a one-time link emailed to them.

CREATE TABLE IF NOT EXISTS customers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(254) NOT NULL,
  name VARCHAR(160) NOT NULL DEFAULT '',
  company VARCHAR(160) NOT NULL DEFAULT '',
  phone VARCHAR(40) NOT NULL DEFAULT '',
  session_nonce CHAR(32) NOT NULL DEFAULT '',
  tax_exempt_status VARCHAR(12) NOT NULL DEFAULT 'none' COMMENT 'none | pending | approved | rejected',
  tax_exempt_note VARCHAR(255) NOT NULL DEFAULT '',
  admin_notes TEXT NULL,
  created_at DATETIME NOT NULL,
  last_login_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_customer_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customer_login_tokens (
  token_hash CHAR(64) NOT NULL COMMENT 'SHA-256 of the emailed token',
  customer_id BIGINT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  PRIMARY KEY (token_hash),
  KEY idx_login_tokens_customer (customer_id),
  CONSTRAINT fk_login_tokens_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS customer_addresses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  label VARCHAR(80) NOT NULL DEFAULT '',
  line1 VARCHAR(200) NOT NULL,
  line2 VARCHAR(200) NOT NULL DEFAULT '',
  city VARCHAR(120) NOT NULL,
  region VARCHAR(10) NOT NULL,
  postal VARCHAR(20) NOT NULL,
  country CHAR(2) NOT NULL DEFAULT 'CA',
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_customer_addresses (customer_id),
  CONSTRAINT fk_customer_addresses FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tax-exemption certificates uploaded by customers, reviewed in /admin/customers
CREATE TABLE IF NOT EXISTS customer_documents (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id BIGINT UNSIGNED NOT NULL,
  kind VARCHAR(30) NOT NULL DEFAULT 'tax_exempt',
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(80) NOT NULL,
  data MEDIUMBLOB NOT NULL,
  note VARCHAR(500) NOT NULL DEFAULT '',
  created_at DATETIME NOT NULL,
  PRIMARY KEY (id),
  KEY idx_customer_documents (customer_id),
  CONSTRAINT fk_customer_documents FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
