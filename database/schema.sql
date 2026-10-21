CREATE TABLE IF NOT EXISTS admins (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(190) NOT NULL,
  password_hash CHAR(128) NOT NULL,
  password_salt CHAR(32) NOT NULL,
  session_nonce CHAR(32) NOT NULL DEFAULT '',
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
  sku VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  short_description VARCHAR(500) NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  condition_name ENUM('New','Used','Remanufactured') NOT NULL DEFAULT 'New',
  kva DECIMAL(12,2) NULL,
  input_voltage VARCHAR(80) NOT NULL DEFAULT '',
  output_voltage VARCHAR(80) NOT NULL DEFAULT '',
  phase VARCHAR(40) NOT NULL DEFAULT '',
  special_type VARCHAR(120) NOT NULL DEFAULT '',
  price_min DECIMAL(14,2) NULL,
  price_max DECIMAL(14,2) NULL,
  currency CHAR(3) NOT NULL DEFAULT 'CAD',
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  lead_time VARCHAR(120) NOT NULL DEFAULT '',
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
