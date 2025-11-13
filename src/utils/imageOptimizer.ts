// utils/imageOptimizer.ts
import { ImageProps } from 'next/image';

/**
 * Optimizes image props for better performance and SEO
 * @param src - Image source
 * @param alt - Alt text for the image
 * @param width - Image width
 * @param height - Image height
 * @returns Optimized image props
 */
export function optimizeImageProps({ 
  src, 
  alt, 
  width, 
  height,
  ...props 
}: Partial<ImageProps> & { src: string; alt: string; width: number; height: number }) {
  // Ensure alt text is descriptive
  const optimizedAlt = alt.trim() || 'Descriptive alt text for this image';
  
  // Optimize loading strategy
  const optimizedProps: Partial<ImageProps> = {
    src,
    alt: optimizedAlt,
    width,
    height,
    loading: 'lazy', // Optimize loading performance
    priority: props.priority || false,
    placeholder: 'blur', // Placeholder while loading
    blurDataURL: props.blurDataURL, // Base64 placeholder
    ...props
  };
  
  return optimizedProps;
}

/**
 * Generate image path with optimization parameters
 * @param path - Base image path
 * @returns Optimized image path with parameters
 */
export function getOptimizedImageSrc(path: string): string {
  // For Next.js built-in image optimization, we just return the path
  // The actual optimization is handled by the Image component
  return path;
}