/**
 * Extracts YouTube Video ID from various URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  // Trim whitespace
  const cleanUrl = url.trim();

  // Standard or short patterns
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = cleanUrl.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  // Already 11 chars video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Returns safe embed URL for iframe
 */
export function getYouTubeEmbedUrl(url: string, autoPlay: boolean = false): string {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return '';
  
  const params = new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    controls: '1'
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
