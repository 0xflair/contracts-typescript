import React from 'react';
import ReactDOM from 'react-dom';

import { NetworkSelector } from './NetworkSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NetworkSelector />, div);
});
