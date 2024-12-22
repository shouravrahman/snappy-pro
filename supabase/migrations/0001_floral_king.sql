/*
  # Create snapshots table

  1. New Tables
    - `snapshots`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `options` (jsonb)
      - `preview_url` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `snapshots` table
    - Add policies for authenticated users to:
      - Read their own snapshots
      - Create new snapshots
      - Delete their own snapshots
*/

CREATE TABLE IF NOT EXISTS snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  options jsonb NOT NULL,
  preview_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE snapshots ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own snapshots
CREATE POLICY "Users can read own snapshots"
  ON snapshots
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create snapshots
CREATE POLICY "Users can create snapshots"
  ON snapshots
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own snapshots
CREATE POLICY "Users can delete own snapshots"
  ON snapshots
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);