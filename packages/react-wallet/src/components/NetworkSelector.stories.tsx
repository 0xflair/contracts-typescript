import React from 'react';
import { NetworkSelector } from './NetworkSelector';
import { withKnobs } from '@storybook/addon-knobs';

export default { title: 'NetworkSelector Component', decorators: [withKnobs]}

export const networkSelector = () => {
  return <NetworkSelector />
}