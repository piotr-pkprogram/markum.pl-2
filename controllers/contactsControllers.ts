import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ErrorHandler from 'utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import { createClient, Entry } from 'contentful';
import { IContactsFields } from 'types/generated/contentful';
import contentfulConnect from 'utils/contentfulConnect';
import { Environment } from 'contentful-management';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

const transformContacts = (item: Entry<IContactsFields>) => {
  const newItem = item.fields;
  newItem._id = item.sys.id;
  return newItem;
};

const getSingleContact = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const contactRes = await client.getEntry<IContactsFields>(req.query.id as string);

    let contact;
    if (!contactRes) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find contacts.'));
    } else {
      contact = transformContacts(contactRes);
    }

    res.status(200).json({
      success: true,
      contact
    });
  }
);

export const getAllContacts = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      if (req.query.id) {
        getSingleContact(req, res, next);
      } else {
        const contentfulRes = await client.getEntries<IContactsFields>({
          content_type: 'contacts'
        });

        const contactsCount = contentfulRes.items.length;
        const contacts = contentfulRes.items.map((contact) => transformContacts(contact));

        res.status(200).json({
          success: true,
          contactsCount,
          contacts
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err
      });
    }
  }
);

export const createNewContact = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const environment: Environment = await contentfulConnect();

    try {
      const contact = await environment.createEntry('contacts', {
        fields: {
          name: {
            'en-US': req.body.name
          },
          phoneNumber: {
            'en-US': req.body.phoneNumber
          }
        }
      });
      await contact.publish();

      if (!req.url?.includes('/api/send-contact'))
        res.status(201).json({
          success: true,
          contact
        });
    } catch (e) {
      if (!req.url?.includes('/api/send-contact'))
        res.status(500).json({
          success: false,
          error: e
        });
    }
  }
);
