import { Props, FormSection } from "./FormSection";

export default { title: "FormSection Component", decorators: [] };

export const defaultFormSection = (args: Props) => {
  return (
    <div className="bg-gray-100 p-8">
      <FormSection {...args}>
        <div>Test Form Elements Here</div>
      </FormSection>
    </div>
  );
};

defaultFormSection.args = {
  title: "My Title",
  description: "A description of my section.",
  toggleable: true,
};