import { useState } from "react";
import { Props, ImageField } from "./ImageField";

export default { title: "ImageField Component", decorators: [] };

export const DefaultFormSection = (args: Props) => {
  const [imageFile, setImageFile] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string>();

  return (
    <div className="bg-gray-100 p-8">
      <ImageField
        {...args}
        setImageFile={setImageFile}
        setImagePreview={setImagePreview}
      />
      <ul className="mt-5">
        <li>
          Image File: name={imageFile?.name} size={imageFile?.size}
        </li>
        <li>
          Image Preview: <img src={imagePreview} />
        </li>
      </ul>
    </div>
  );
};

DefaultFormSection.args = {
  label: "My Image",
} as Props;
