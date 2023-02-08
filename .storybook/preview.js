import Layout from './Layout';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import * as NextImage from "next/image";

addDecorator(storyFn => <Layout>{storyFn()}</Layout>);
addDecorator(withInfo({
  inline: true,
  propTablesExclude: [Layout]
}));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
});