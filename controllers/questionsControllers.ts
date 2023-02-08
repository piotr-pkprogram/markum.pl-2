import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ApiFeatures from 'utils/apifeatures';
import ErrorHandler from 'utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import { createClient, Entry } from 'contentful';
import { IQuestionsFields, IReviewsFields } from 'types/generated/contentful';

const client = createClient({
  space: process.env.CONTENTFUL_API_ID as string,
  accessToken: process.env.CONTENTFUL_API_PUBLIC_KEY as string
});

export const transformQuestion = (item: Entry<IQuestionsFields>) => {
  const newItem = item.fields;
  newItem._id = item.sys.id;

  return newItem;
};

const getSingleQuestion = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const questionRes = await client.getEntry<IQuestionsFields>(req.query.id as string);

    let question;
    if (!questionRes) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find question.'));
    } else {
      question = transformQuestion(questionRes);
    }

    res.status(200).json({
      success: true,
      question
    });
  }
);

export const getAllQuestions = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      if (req.query.id) {
        getSingleQuestion(req, res, next);
      } else {
        const apiFeatures = new ApiFeatures('questions', req.query);
        const questionsRes = await apiFeatures.query;

        const questions = questionsRes.items
          .sort((a: Entry<IQuestionsFields>, b: Entry<IQuestionsFields>) => {
            return a.fields.id < b.fields.id ? -1 : 1;
          })
          .map((item: Entry<IQuestionsFields>) => transformQuestion(item))
        const questionsCount = questions.length;

        res.status(200).json({
          success: true,
          questionsCount,
          questions
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
