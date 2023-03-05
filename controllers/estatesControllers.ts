import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ErrorHandler from 'utils/errorHandler';
import { uploadOffersFromEsti } from 'utils/uploadOffersFromEsti';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import { checkUploadTime, saveOffersToJSON } from 'utils/saveOffersToJSON';

const uploadOffers = async () => {
  const newEstates = Array.from(await uploadOffersFromEsti());
  saveOffersToJSON(newEstates);
};

export const getOffers = () => {
  const isUploaded = checkUploadTime();

  if (!isUploaded.checkTime && process.env.APP_ENV == 'dev') {
    uploadOffers();
  }

  return isUploaded.estates;
};

const getSingleEstateById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const estateRes = Array.from(await getOffers()).filter(
      (estate: any) => estate.id == req.query.id
    );
    let estate;
    if (!estateRes) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find estate.'));
    } else {
      estate = estateRes[0];
    }

    res.status(200).json({ success: true, estate });
  }
);

const getSingleEstateByLink = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const estateRes = Array.from(await getOffers()).filter(
      (estate: any) => estate.link == req.query.link
    );

    let estate;
    if (!(estateRes.length > 0)) {
      return next(new ErrorHandler(404, 'Please enter correct link. Cannot find estate.'));
    } else {
      estate = estateRes[0];
    }

    res.status(200).json({ success: true, estate });
  }
);

export const getAllEstates = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      if (req.query.id && req.query.id !== '') {
        getSingleEstateById(req, res, next);
      } else if (req.query.link && req.query.link !== '') {
        getSingleEstateByLink(req, res, next);
      } else {
        let resPerPage;

        if ('isMore' in req.query && req.query.isMore !== 'false') resPerPage = 12;
        else resPerPage = 8;

        let estates = Array.from(await getOffers());
        let estatesCount = estates.length;

        if (req.query.page) {
          const currentPage = Number(req.query.page) || 1;
          const skip = resPerPage * (currentPage - 1);
          let query;

          if (req.query.category) {
            estatesCount = estates.filter(
              (estate: any) => estate.category === req.query.category
            ).length;
            query = estates.filter((_, index) => index >= skip);
            query = query.filter((estate: any) => estate.category === req.query.category);
            query = query.slice(0, resPerPage);
          } else query = estates.filter((estate, index) => index > skip);
          estates = query;
        }
        const filteredEstatesCount = estates.length;

        res.status(200).json({
          success: true,
          estatesCount,
          resPerPage,
          filteredEstatesCount,
          estates
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, error: err });
    }
  }
);
