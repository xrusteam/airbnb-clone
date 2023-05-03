'use client';

import { IoMdClose } from 'react-icons/io';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import Button from '../Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
  title,
  body,
  footer,
}) => {
  const [showModal, setShowModal] =
    useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction =
    useCallback(() => {
      if (disabled || !secondaryAction) {
        return;
      }

      secondaryAction();
    }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div className="flex justify-center items-center inset-0 bg-neutral-800/70 fixed overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
        <div className="h-full md:w-4/6 lg:w-3/6 xl:w-2/5 relative w-full my-6 mx-auto lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full ${
              showModal
                ? 'translate-y-0'
                : 'translate-y-full'
            } ${
              showModal
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction &&
                    secondaryActionLabel && (
                      <Button
                        onClick={
                          handleSecondaryAction
                        }
                        outline
                        disabled={disabled}
                        label={
                          secondaryActionLabel
                        }
                      />
                    )}
                  <Button
                    onClick={handleSubmit}
                    disabled={disabled}
                    label={actionLabel}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
