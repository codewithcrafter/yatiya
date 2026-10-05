"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80";

export function SmartImage({ src, fallbackSrc = DEFAULT_FALLBACK, alt, ...props }: SmartImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Fashion imagery"}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
