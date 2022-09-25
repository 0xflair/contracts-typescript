import ReactDOM from 'react-dom';

import { CodeBlock } from './CodeBlock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CodeBlock code={`console.log("something", true);`} />, div);
});
