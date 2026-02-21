/*
  # Create Cybersecurity Incidents Table

  1. New Tables
    - `incidents`
      - `id` (uuid, primary key) - Unique incident identifier
      - `incident_number` (text, unique) - Human-readable incident number (e.g., INC-001)
      - `title` (text) - Brief incident title
      - `description` (text) - Detailed incident description
      - `severity` (text) - Incident severity level (critical, high, medium, low)
      - `status` (text) - Current incident status (open, investigating, contained, resolved, closed)
      - `incident_type` (text) - Type of cybersecurity incident (malware, phishing, data_breach, ddos, unauthorized_access, insider_threat, ransomware, other)
      - `affected_systems` (text) - Systems affected by the incident
      - `reporter_name` (text) - Name of person who reported the incident
      - `reporter_email` (text) - Email of person who reported the incident
      - `assigned_to` (uuid) - User ID of assigned security analyst (references auth.users)
      - `detected_at` (timestamptz) - When the incident was detected
      - `resolved_at` (timestamptz) - When the incident was resolved
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `incidents` table
    - Add policy for authenticated users to read all incidents
    - Add policy for authenticated users to create incidents
    - Add policy for authenticated users to update incidents
    - Add policy for authenticated users to delete incidents

  3. Indexes
    - Add index on `status` for filtering
    - Add index on `severity` for filtering
    - Add index on `incident_type` for filtering
    - Add index on `assigned_to` for lookups

  Note: In a production environment, you would want more granular RLS policies
  based on user roles (e.g., only security team can update/delete).
*/

CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_number text UNIQUE NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  severity text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  incident_type text NOT NULL,
  affected_systems text DEFAULT '',
  reporter_name text NOT NULL,
  reporter_email text NOT NULL,
  assigned_to uuid REFERENCES auth.users(id),
  detected_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all incidents"
  ON incidents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create incidents"
  ON incidents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update incidents"
  ON incidents
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete incidents"
  ON incidents
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS incidents_status_idx ON incidents(status);
CREATE INDEX IF NOT EXISTS incidents_severity_idx ON incidents(severity);
CREATE INDEX IF NOT EXISTS incidents_incident_type_idx ON incidents(incident_type);
CREATE INDEX IF NOT EXISTS incidents_assigned_to_idx ON incidents(assigned_to);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_incidents_updated_at'
  ) THEN
    CREATE TRIGGER update_incidents_updated_at
      BEFORE UPDATE ON incidents
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;