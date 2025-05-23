import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  priority?: boolean;
}

/**
 * Optimized image component with WebP and AVIF support
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  onLoad,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // Generate URLs for different formats
  const webpSrc = `${src}?webp`;
  const avifSrc = `${src}?avif`;
  
  return (
    <>
      {!isLoaded && (
        <div 
          className={cn(
            "bg-gray-200 dark:bg-gray-700 animate-pulse",
            className
          )}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      
      <picture className={!isLoaded ? 'hidden' : undefined}>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img 
          src={src} 
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          width={width}
          height={height}
          className={cn(
            "w-full h-auto",
            className
          )}
          onLoad={handleLoad}
        />
      </picture>
    </>
  );
};

export default OptimizedImage;
