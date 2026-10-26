export function formatName(name: string): string {
  if (!name) return '';
  return name.trim().split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');
}

export function truncateText(text: string, maxChars: number = 80): string {
  if (!text) return '';
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + '...';
}

export function formatTimestamp(isoString: string): string {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
}
