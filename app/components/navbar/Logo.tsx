'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      width="100"
      height="100"
      src="/images/logo.png"
      className="hidden md:block cursor-pointer"
    />
  );
};

export default Logo;
