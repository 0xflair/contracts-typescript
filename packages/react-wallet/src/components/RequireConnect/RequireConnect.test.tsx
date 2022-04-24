import React from 'react';
import ReactDOM from 'react-dom';

import { RequireConnect } from './RequireConnect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RequireConnect>
      <>Test</>
    </RequireConnect>,
    div
  );
});
