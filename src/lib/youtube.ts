/** Extracts a YouTube video ID from any common URL format. */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /[?&]v=([^&#]+)/,                          // youtube.com/watch?v=ID
    /youtu\.be\/([^?&#]+)/,                    // youtu.be/ID
    /youtube\.com\/embed\/([^?&#]+)/,          // youtube.com/embed/ID
    /youtube\.com\/shorts\/([^?&#]+)/,         // youtube.com/shorts/ID
    /youtube\.com\/v\/([^?&#]+)/,              // youtube.com/v/ID
    /youtube\.com\/live\/([^?&#]+)/,           // youtube.com/live/ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
