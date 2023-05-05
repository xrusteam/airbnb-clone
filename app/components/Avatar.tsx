'use client';

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src: string | undefined | null;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
}) => {
  return (
    <Image
      alt="Avatar"
      width="30"
      height="30"
      src={src || '/images/placeholder.jpg'}
      className="rounded-full"
    />
  );
};

export default Avatar;
