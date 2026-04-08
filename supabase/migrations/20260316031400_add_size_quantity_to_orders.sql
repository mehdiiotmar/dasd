/*
  # Add Size and Quantity to Orders Table

  1. Changes
    - Add `size` column (text) - Tacos size (M, L, XL)
    - Add `quantity` column (integer) - Number of tacos ordered
  
  2. Notes
    - Uses IF NOT EXISTS pattern to prevent errors on re-run
    - Sets default values for backwards compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'size'
  ) THEN
    ALTER TABLE orders ADD COLUMN size text NOT NULL DEFAULT 'L';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'quantity'
  ) THEN
    ALTER TABLE orders ADD COLUMN quantity integer NOT NULL DEFAULT 1;
  END IF;
END $$;
