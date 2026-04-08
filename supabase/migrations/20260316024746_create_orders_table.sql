/*
  # Create Orders System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key) - Unique order identifier
      - `order_number` (text, unique) - Human-readable order number (e.g., "NST-20260316-001")
      - `customer_name` (text) - Customer's name
      - `customer_phone` (text) - Customer's phone number
      - `meat` (text) - Selected meat type
      - `sauce` (text) - Selected sauce
      - `extras` (jsonb) - Array of selected extras
      - `special_instructions` (text) - Any special requests
      - `total_price` (numeric) - Total order price
      - `status` (text) - Order status (pending, confirmed, preparing, delivered)
      - `created_at` (timestamptz) - Order creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `orders` table
    - Add policy for anyone to create orders (public orders)
    - Add policy for authenticated users to view all orders (admin access)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  meat text NOT NULL,
  sauce text NOT NULL,
  extras jsonb DEFAULT '[]'::jsonb,
  special_instructions text DEFAULT '',
  total_price numeric(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
