/*
  # Add Delivery Location to Orders

  1. Changes
    - Add `delivery_address` column to store customer's delivery address
    - Column is optional (nullable) as some customers may prefer pickup
  
  2. Notes
    - The delivery address will be captured from customer input
    - This allows for better order tracking and delivery management
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'delivery_address'
  ) THEN
    ALTER TABLE orders ADD COLUMN delivery_address text DEFAULT '';
  END IF;
END $$;