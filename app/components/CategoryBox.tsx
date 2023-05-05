'use client';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    console.log(currentQuery, 'current');

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    console.log(updatedQuery, 'upd');

    if (params?.get('category') === label) {
      delete updatedQuery.category;
      console.log('deletd');
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    console.log(url, 'url');

    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col gap-2 transition items-center justify-center p-3 border-b-2 hover:text-neutral-800 cursor-pointer ${
        selected
          ? 'border-b-neutral-800'
          : 'border-transparent'
      } ${
        selected
          ? 'text-neutral-800'
          : 'text-neutral-500'
      }`}
    >
      <Icon size={26} />
      <h2 className="font-medium text-sm">
        {label}
      </h2>
    </div>
  );
};

export default CategoryBox;
