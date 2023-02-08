import { Space } from 'contentful-management';
const contentfulManagement = require("contentful-management");

export default async () => {
  const contentfulClient = await contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_API_MANAGMENT_KEY as string,
  })

  return await contentfulClient
    .getSpace(process.env.CONTENTFUL_API_ID as string)
    .then((space: Space)  => space.getEnvironment('master'))
}