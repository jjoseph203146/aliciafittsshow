-- ============================================================
-- Good News in the CSRA — Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Episodes
CREATE TABLE IF NOT EXISTS episodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  title TEXT NOT NULL,
  guest_name TEXT,
  description TEXT,
  category TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Spotlights
CREATE TABLE IF NOT EXISTS spotlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  org TEXT,
  bio TEXT,
  impact TEXT,
  category TEXT,
  photo_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Photo Gallery
CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category TEXT,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Story Submissions ("Be on the Show")
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  org TEXT,
  story TEXT NOT NULL,
  heard_from TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'contacted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nominations
CREATE TABLE IF NOT EXISTS nominations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nominator_name TEXT NOT NULL,
  email TEXT NOT NULL,
  nominee_name TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'selected', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE spotlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominations ENABLE ROW LEVEL SECURITY;

-- Public read: published content only
CREATE POLICY "Public read published episodes" ON episodes
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read published spotlights" ON spotlights
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public read photos" ON photos
  FOR SELECT USING (true);

-- Public write: form submissions
CREATE POLICY "Public insert submissions" ON submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert nominations" ON nominations
  FOR INSERT WITH CHECK (true);

-- Authenticated (admin): full access
CREATE POLICY "Admin full access episodes" ON episodes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access spotlights" ON spotlights
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access photos" ON photos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin read submissions" ON submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update submissions" ON submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin read nominations" ON nominations
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update nominations" ON nominations
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- Storage bucket for photos
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read photos bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

CREATE POLICY "Admin upload photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'photos' AND auth.role() = 'authenticated');
