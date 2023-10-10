import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ApiFeatures from 'utils/apifeatures';
import ErrorHandler from 'utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import { Entry } from 'contentful';
import { IReviewsFields, IServicesFields, IStepsFields } from 'types/generated/contentful';
import { createClient } from 'contentful';
import { transformReview } from 'controllers/reviewsControllers';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

export const transformService = async (item: Entry<IServicesFields>) => {
  const newItem = item.fields;
  // @ts-ignore
  newItem.icon = newItem.icon.fields.file.url;
  newItem._id = item.sys.id;
  
  newItem.created = item.sys.createdAt;
  newItem.updated = item.sys.updatedAt;
  
  // @ts-ignore
  newItem.process = await Promise.all(
    newItem.process.map(async (stage) => {
      const newStage = stage.fields;
      // @ts-ignore
      newStage.steps = await Promise.all(
        newStage.steps.map(async (step) => {
          const newStep = await client.getEntry<IStepsFields>(step.sys.id);
          // @ts-ignore
          newStep.fields.icon = newStep.fields.icon.fields.file.url;

          return { _id: newStep.sys.id, ...newStep.fields };
        })
      );
      newStage._id = stage.sys.id;
      return newStage;
    })
  );

  return newItem;
};

const getSingleServiceById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const serviceRes = await client.getEntry<IServicesFields>(req.query.id as string);

    let service;
    if (!serviceRes) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find service.'));
    } else {
      service = await transformService(serviceRes);
    }

    res.status(200).json({
      success: true,
      service
    });
  }
);

const getSingleServiceByLink = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const serviceRes = await client.getEntries<IServicesFields>({
      content_type: 'services',
      'fields.link': req.query.link,
      limit: 1
    });

    let service;
    if (!(serviceRes.items.length > 0)) {
      return next(new ErrorHandler(404, 'Please enter correct link. Cannot find service.'));
    } else {
      service = await transformService(serviceRes.items[0]);
    }

    const reviewsRes = await client.getEntries<IReviewsFields>({ content_type: 'reviews' });
    const reviews = reviewsRes.items.map((review) => transformReview(review));

    res.status(200).json({
      success: true,
      service,
      reviews
    });
  }
);

export const getAllServices = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      if (req.query.id) {
        getSingleServiceById(req, res, next);
      } else if (req.query.link) {
        getSingleServiceByLink(req, res, next);
      } else {
        const apiFeatures = new ApiFeatures('services', req.query);

        const servicesRes = await apiFeatures.query;
        const services = await Promise.all(
          servicesRes.items
            .sort((a: Entry<IServicesFields>, b: Entry<IServicesFields>) => {
              return a.fields.id < b.fields.id ? -1 : 1;
            })
            .map(async (item: Entry<IServicesFields>) => await transformService(item))
        );
        const servicesCount = services.length;

        res.status(200).json({
          success: true,
          servicesCount,
          services
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
