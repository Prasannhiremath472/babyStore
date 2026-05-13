import { useState } from 'react';
import { PRODUCT_IMAGES } from '../../constants/images';

interface Props {
  src?: string;
  alt: string;
  categorySlug?: string;
  className?: string;
  fallbackEmoji?: string;
}

/**
 * Smart product image component.
 * - Uses DB image URL if available and not external
 * - Falls back to local category image
 * - Falls back to emoji if all else fails
 */
export default function ProductImage({ src, alt, categorySlug, className = '', fallbackEmoji = '🧸' }: Props) {
  const [errored, setErrored] = useState(false);

  // Determine the best image source
  const isExternal = src && (src.includes('unsplash.com') || src.includes('cloudinary.com'));
  const localFallback = categorySlug
    ? PRODUCT_IMAGES[categorySlug] || PRODUCT_IMAGES['default']
    : PRODUCT_IMAGES['default'];

  const imgSrc = errored || isExternal ? localFallback : (src || localFallback);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}
