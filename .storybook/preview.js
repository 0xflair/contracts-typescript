import { addDecorator } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';

addDecorator(withContexts([]));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}