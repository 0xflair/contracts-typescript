import { classNames } from '@0xflair/react-common';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export type ImageFieldProps = {
  label: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  imageFile?: File;
  imagePreview?: string;
  setImageFile: (value: File) => void;
  setImagePreview: (value: string) => void;
};

export const ImageField = (props: ImageFieldProps) => {
  const {
    label,
    description,
    className,
    disabled,
    imageFile,
    imagePreview,
    setImageFile,
    setImagePreview,
  } = props;

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const base64Url = URL.createObjectURL(acceptedFiles[0]);
      setImageFile(acceptedFiles[0]);
      setImagePreview(base64Url);
    },
    [setImageFile, setImagePreview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
  });

  return (
    <div
      className={classNames(
        className || '',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      )}
    >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        {...getRootProps()}
        className={`mt-1 px-6 pt-5 pb-6 border-2 border-dashed rounded-md focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 ${
          isDragActive ? 'border-indigo-300' : 'border-gray-300'
        }`}
      >
        <div className="text-sm text-gray-600">
          <input className="sr-only" {...getInputProps()} />
          <div className="space-x-4 flex">
            <div className="w-10">
              {imagePreview ? (
                <img
                  alt="collectionImage"
                  src={imagePreview}
                  className="shadow-lg rounded-lg w-full"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload a file</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      {description ? (
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      ) : (
        ''
      )}
    </div>
  );
};
