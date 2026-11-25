import { useState, type ReactNode } from 'react';
import { Dumbbell } from 'lucide-react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectClass?: string;
  fallbackIcon?: ReactNode;
}

export function SmartImage({
  src,
  alt,
  className = '',
  priority = false,
  aspectClass = '',
  fallbackIcon,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 text-center text-zinc-400 ${aspectClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallbackIcon ?? <Dumbbell className="h-8 w-8 text-lime-400/70" />}
        <span className="max-w-xs text-xs font-medium text-zinc-300">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
