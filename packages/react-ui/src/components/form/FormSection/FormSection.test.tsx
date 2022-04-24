import ReactDOM from 'react-dom';

import { FormSection } from './FormSection';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FormSection title="test" description="test">
      Something
    </FormSection>,
    div
  );
});
