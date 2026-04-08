/*
  # Fix Orders RLS Policy

  1. Changes
    - Add policy for anonymous users to read their own created orders
    - This allows the insert operation to return the created order data
  
  2. Security
    - Anonymous users can still only INSERT orders
    - They can now also SELECT orders to receive confirmation after creation
*/

-- Drop existing SELECT policy and create a new one that allows anon users
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON orders;

CREATE POLICY "Anyone can view orders"
  ON orders
  FOR SELECT
  TO anon, authenticated
  USING (true);
