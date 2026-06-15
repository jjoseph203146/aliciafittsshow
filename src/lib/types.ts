export interface Episode {
  id: string;
  youtube_url: string;
  youtube_id: string;
  title: string;
  guest_name: string | null;
  description: string | null;
  category: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Spotlight {
  id: string;
  name: string;
  title: string | null;
  org: string | null;
  bio: string | null;
  impact: string | null;
  category: string | null;
  photo_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface Photo {
  id: string;
  image_url: string;
  category: string | null;
  caption: string | null;
  created_at: string;
}

export interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  org: string | null;
  story: string;
  heard_from: string | null;
  status: "new" | "reviewed" | "contacted" | "rejected";
  created_at: string;
}

export interface Nomination {
  id: string;
  nominator_name: string;
  email: string;
  nominee_name: string;
  reason: string;
  status: "new" | "reviewed" | "selected" | "declined";
  created_at: string;
}
