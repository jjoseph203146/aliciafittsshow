"use client";

import { useState } from "react";

export default function EpisodeThumbnail({ videoId, title }: { videoId: string; title: string }) {
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
  if (!videoId) {
    return <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#3A2456,#241B33)", position: "absolute", inset: 0 }} />;
  }
  return (
    <img
      src={src}
      alt={title}
      onError={() => setSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
