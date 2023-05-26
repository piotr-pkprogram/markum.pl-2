import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import { createClient } from 'contentful';
import { IQuestionsFields, IReviewsFields, IServicesFields } from 'types/generated/contentful';
import { transformReview } from 'controllers/reviewsControllers';
import { transformQuestion } from 'controllers/questionsControllers';
import { transformService } from 'controllers/servicesControllers';
import { getAllOffers } from 'controllers/estatesControllers';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

export const getAllData = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const questionsRes = await client.getEntries<IQuestionsFields>({ content_type: 'questions' });
      const reviewsRes = await client.getEntries<IReviewsFields>({ content_type: 'reviews' });
      const servicesRes = await client.getEntries<IServicesFields>({ content_type: 'services' });

      const estates = Array.from(await getAllOffers());
      const questions = questionsRes.items.map((item) => transformQuestion(item)).reverse();
      const reviews = reviewsRes.items.map((item) => transformReview(item)).reverse();
      const services = await Promise.all(
        servicesRes.items.map(async (item) => await transformService(item)).reverse()
      );

      res.status(200).json({
        success: true,
        estates,
        questions,
        reviews,
        services
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err
      });
    }
  }
);
