import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ErrorHandler from 'utils/errorHandler';
import { NextFunction } from 'connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient, Entry } from 'contentful';
import { IReviewsFields } from 'types/generated/contentful';
import ApiFeatures from 'utils/apifeatures';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

export const transformReview = (item: Entry<IReviewsFields>) => {
  const newItem = item.fields;
  // @ts-ignore
  newItem.image = newItem.image?.fields.file.url;
  newItem._id = item.sys.id;
  return newItem;
};

const getSingleReview = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const reviewRes = await client.getEntry<IReviewsFields>(req.query.id as string);

    let review;
    if (!reviewRes) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find review.'));
    } else {
      review = transformReview(reviewRes);
    }

    res.status(200).json({
      success: true,
      review
    });
  }
);

export const getAllReviews = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      if (req.query.id) {
        getSingleReview(req, res, next);
      } else {
        const resPerPage = 6;

        const reviewsApiFeatures = new ApiFeatures('reviews', req.query);
        let reviewsRes = await reviewsApiFeatures.query;

        let reviews = reviewsRes.items
          .sort((a: Entry<IReviewsFields>, b: Entry<IReviewsFields>) => {
            return a.fields.id < b.fields.id ? -1 : 1;
          })
          .map((item: Entry<IReviewsFields>) => transformReview(item))
        const reviewsCount = reviews.length;

        if (req.query.page) {
          reviewsApiFeatures.pagination(resPerPage);
          reviewsRes = await reviewsApiFeatures.query;
          reviews = reviewsRes.items
            .sort((a: Entry<IReviewsFields>, b: Entry<IReviewsFields>) => {
              return a.fields.id < b.fields.id ? -1 : 1;
            })
            .map((item: Entry<IReviewsFields>) => transformReview(item));
        }
        const filteredReviewsCount = reviews.length;

        res.status(200).json({
          success: true,
          reviewsCount,
          resPerPage,
          filteredReviewsCount,
          reviews
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
