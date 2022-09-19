import ReactDOM from 'react-dom';

import { ImageField } from './ImageField';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ImageField
      label="My Image"
      setImageFile={(imageFile) => {}}
      setImagePreview={(imagePreview) => {}}
    />,
    div
  );
});
