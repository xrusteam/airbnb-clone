'use client';

import React from 'react';
import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      alt="Avatar"
      width="30"
      height="30"
      src="/images/placeholder.jpg"
      className="rounded-full"
    />
  );
};

export default Avatar;
