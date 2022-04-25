import React from 'react';
import ReactDOM from 'react-dom';

import { CryptoPrice } from './CryptoPrice';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CryptoPrice />, div);
});
