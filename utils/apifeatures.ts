import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

export default class ApiFeatures {
  query: any;
  queryStr: any;
  contentType: string;

  constructor(contentType: any, queryStr: any) {
    this.contentType = contentType;
    this.queryStr = queryStr;

    if (queryStr.category)
      this.query = client.getEntries({
        content_type: contentType,
        'fields.category': queryStr.category
      });
    else this.query = client.getEntries({ content_type: contentType });
  }

  search() {
    const location = this.queryStr.location
      ? {
          address: {
            $regex: this.queryStr.location,
            $options: 'i'
          }
        }
      : {};

    this.query = this.query.find({ ...location });
    return this;
  }

  pagination(resPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    if (this.queryStr.category)
      this.query = client.getEntries({
        content_type: this.contentType,
        'fields.category': this.queryStr.category,
        skip,
        limit: resPerPage
      });
    else
      this.query = client.getEntries({
        content_type: this.contentType,
        skip,
        limit: resPerPage
      });

    return this;
  }
}
