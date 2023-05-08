'use client';

import { useDropzone } from 'react-dropzone';
import React, {
  useCallback,
  useState,
} from 'react';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
}) => {
  const [base64, setBase64] = useState(value);

  const handleUpload = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const hadndleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleUpload(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      onDrop: hadndleDrop,
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
    });

  return (
    <div
      {...getRootProps({
        className: `relative w-full ${
          !base64 ? 'p-14' : 'p-48'
        } text-white text-center border-2 border-dotted rounded-md border-neutral-700`,
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={base64}
            fill
            alt="Upload Image"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center text-neutral-500">
          <TbPhotoPlus size={50} />
          <p className="font-light">
            Upload your image
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
