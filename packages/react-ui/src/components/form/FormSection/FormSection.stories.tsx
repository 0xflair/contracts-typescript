import { FormSection, FormSectionProps } from './FormSection';

export default { title: 'FormSection Component', decorators: [] };

export const DefaultFormSection = (args: FormSectionProps) => {
  return (
    <div className="bg-gray-100 p-8">
      <FormSection {...args}>
        <div>Test Form Elements Here</div>
      </FormSection>
    </div>
  );
};

DefaultFormSection.args = {
  title: 'My Title',
  description: 'A description of my section.',
  toggleable: true,
} as FormSectionProps;
