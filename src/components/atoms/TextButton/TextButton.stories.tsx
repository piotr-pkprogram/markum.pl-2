import React from 'react';
import TextButton from './TextButton';

export default {
  title: 'components/atoms/TextButton',
  component: TextButton,
  argTypes: {
    type: {
      defaultValue: 'button',
      type: 'text'
    },
    to: {
      defaultValue: '',
      type: 'text'
    },
    isFill: {
      defaultValue: false,
      type: 'boolean'
    },
    isRouterLink: {
      defaultValue: false,
      type: 'boolean'
    },
    isExternalLink: {
      defaultValue: false,
      type: 'boolean'
    }
  }
};

const Template = (args: object) => <TextButton {...args}>Read More</TextButton>;

export const Default = Template.bind([]);

export const Fill = Template.bind([]);
// @ts-ignore
Fill.args = {
  isFill: true
};

export const RouterLink = Template.bind([]);
// @ts-ignore
RouterLink.args = {
  isRouterLink: true
};

export const ExternalLink = Template.bind([]);
// @ts-ignore
ExternalLink.args = {
  isExternalLink: true
};
