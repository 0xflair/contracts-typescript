import { CodeBlock, CodeBlockProps } from './CodeBlock';

export default { title: 'CodeBlock Component', decorators: [] };

export const DefaultCodeBlock = (args: CodeBlockProps) => {
  return (
    <div className="bg-gray-100 p-8">
      <CodeBlock {...args} />
    </div>
  );
};

DefaultCodeBlock.args = {
  code: `console.log("something", true);`,
} as CodeBlockProps;
