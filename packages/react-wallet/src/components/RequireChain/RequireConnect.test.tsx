import React from 'react';
import ReactDOM from 'react-dom';

import { RequireConnect } from '../RequireConnect/RequireConnect';
import { RequireChain } from './RequireChain';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RequireConnect>
      <RequireChain requiredChainId={1}>
        <>Test</>
      </RequireChain>
    </RequireConnect>,
    div
  );
});
