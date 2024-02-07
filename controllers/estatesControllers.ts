import catchAsyncErrors from 'middlewares/catchAsyncErrors';
import ErrorHandler from 'utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction } from 'connect';
import fs from 'fs';

export const getAllOffers = () => {
  const files = fs.readdirSync('public/offers');
  const estates = files.map((file) => {
    const json = fs.readFileSync(`public/offers/${file}`, { encoding: 'utf8', flag: 'r' });
    return JSON.parse(json);
  });
  estates.sort((a, b) => {
    const aDate = new Date(a.createdDate);
    const bDate = new Date(b.createdDate);
    
    if ( aDate.getTime() > bDate.getTime()) return -1;
    else if (aDate.getTime() < bDate.getTime()) return 1;
    
    return 0;
  });

  return estates;
};

const getSingleEstateById = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    let estate = {};

    if (!fs.existsSync(`public/offers/estate-${req.query.id}.json`)) {
      return next(new ErrorHandler(404, 'Please enter correct id. Cannot find estate.'));
    } else {
      const json = fs.readFileSync(`public/offers/estate-${req.query.id}.json`, {
        encoding: 'utf8',
        flag: 'r'
      });
      estate = JSON.parse(json);
    }

    res.status(200).json({ success: true, estate });
  }
);

const getSingleEstateByLink = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const link = req.query.link as string;
    let estateId: string | string[] = link.split('-');
    estateId = estateId[estateId.length - 1];
    let estate = {};

    if (!fs.existsSync(`public/offers/estate-${estateId}.json`)) {
      return next(new ErrorHandler(404, 'Please enter correct link. Cannot find estate.'));
    } else {
      const json = fs.readFileSync(`public/offers/estate-${estateId}.json`, {
        encoding: 'utf8',
        flag: 'r'
      });
      estate = JSON.parse(json);
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
        const resPerPage = 10;

        let estates = Array.from(await getAllOffers());
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
