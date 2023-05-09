import React from 'react';
import { SafeUser } from '../types';
import {
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorite, toggleFavorite } =
    useFavorite({ listingId, currentUser });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-0.5 -right-0.5"
      />
      <AiFillHeart
        size={24}
        className={`${
          hasFavorite
            ? 'fill-rose-500'
            : 'fill-neutral-500/70'
        }`}
      />
    </div>
  );
};

export default HeartButton;
