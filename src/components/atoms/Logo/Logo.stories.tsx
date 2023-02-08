import React from 'react';
import Logo from './Logo';

export default {
  title: 'components/atoms/Logo',
  component: Logo
};

const Template = (args: object) => <Logo {...args} />;

export const Default = Template.bind([]);
