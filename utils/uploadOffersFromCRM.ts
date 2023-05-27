import axios from 'axios';
import { promises as Fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import getAllOffers from 'utils/getAllOffers';
import updateOffers from 'utils/updateOffers';
import deleteOldOffers from 'utils/deleteOldOffers';

export const uploadOffersFromCRM = async (req: NextApiRequest, res: NextApiResponse) => {
  const crmOffers = await axios.get(
    `https://api.asariweb.pl/apiSite/exportedListingIdList?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}`
  );

  const directory = await Fs.opendir('public/offers');
  const entry = await directory.read();
  await directory.close();

  const listingsList = Array.isArray(crmOffers.data.data)
    ? crmOffers.data.data
    : [
        {
          ...crmOffers.data.data
        }
      ];

  if (entry === null) {
    await getAllOffers(listingsList);
  } else {
    await updateOffers(listingsList);
  }

  deleteOldOffers(listingsList);

  res.status(200).json({ success: true, processStatus: 'Starting upload' });
};
