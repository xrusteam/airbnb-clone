'use client';

import React, {
  useCallback,
  useState,
} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-s-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-12 right-0 rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden bg-white">
          <div className="flex flex-col cursor-pointer">
            <MenuItem
              label="Login"
              onClick={() => {}}
            />
            <MenuItem
              label="Sign Up"
              onClick={registerModal.onOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
