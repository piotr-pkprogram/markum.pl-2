import React from 'react';
import TextLink from './TextLink';

export default {
  title: 'components/atoms/TextLink',
  component: TextLink
};

// @ts-ignore
const Template = (args: object) => <TextLink {...args}>Read More</TextLink>;

export const SimpleLink = Template.bind([]);

export const RouterLink = Template.bind([]);
// @ts-ignore
RouterLink.args = {
  to: '/read-more',
  isRouterLink: true
};

export const ExternalLink = Template.bind([]);
// @ts-ignore
ExternalLink.args = {
  to: '/read-more',
  isExternalLink: true
};
