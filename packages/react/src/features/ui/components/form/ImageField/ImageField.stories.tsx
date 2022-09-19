import { useState } from 'react';

import { ImageField, ImageFieldProps } from './ImageField';

export default { title: 'ImageField Component', decorators: [] };

export const DefaultImageField = (args: ImageFieldProps) => {
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  return (
    <div className="bg-gray-100 p-8">
      <ImageField
        {...args}
        imageFile={imageFile}
        imagePreview={imagePreview}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
      />
      <ul className="mt-5">
        <li>
          Image File: name={imageFile?.name} size={imageFile?.size}
        </li>
        <li>
          Image Preview: <img alt="preview" src={imagePreview} />
        </li>
      </ul>
    </div>
  );
};

DefaultImageField.args = {
  label: 'My Image',
  description: 'Some explanation',
} as ImageFieldProps;
