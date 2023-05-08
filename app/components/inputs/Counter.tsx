'use client';

import React, { useCallback } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex felx-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <p className="font-light text-gray-600">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600">
          {value}
        </div>
        <button
          onClick={onAdd}
          className="w-10 h-10 rounded-full border flex items-center justify-center text-neutral-600 hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
