import { EstateType } from 'types/estateType';
import deletePolishChars from 'utils/deletePolishChars';
import axios from 'axios';
import { IEstateFields } from 'types/generated/contentful';
import { promisify } from 'util';
import https from 'https';
import { promises as Fs } from 'fs';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const sizeOf = promisify(require('image-size'));

const transformOffer = (offer: any) => {
  const link =
    offer.street && offer.location.quarter
      ? `${deletePolishChars(offer.location.quarter.toLowerCase())}-${deletePolishChars(
          offer.street.name.toLowerCase()
        )}-${offer.id}`
      : offer.location.quarter
      ? `${deletePolishChars(offer.location.quarter.toLowerCase())}-${offer.id}`
      : offer.street
      ? `${deletePolishChars(offer.location.locality.toLowerCase())}-${deletePolishChars(
          offer.street.name.toLowerCase()
        )}-${offer.id}`
      : `${deletePolishChars(offer.location.locality.toLowerCase())}-${offer.id}`;

  const newOffer: EstateType = {
    id: parseInt(offer.id),
    category: offer.sectionName.toLowerCase().includes('rental') ? 'FOR_RENT' : 'FOR_SALE',
    link: offer.sectionName.toLowerCase().includes('rental')
      ? '/na-wynajem/' + link
      : '/na-sprzedaz/' + link,
    desc: offer.description,
    address: {
      city: offer.location.locality,
      district: offer.location.quarter.split('-')[1],
      street: offer.location.street?.name
    },
    images: offer.images,
    tourLink: offer.virtualTourUrl,
    videoLink: offer.videoUrl,
    price: offer.price.amount,
    priceForm2: offer.priceM2.amount,
    area: offer.totalArea,
    numOfRooms: offer.noOfRooms,
    constructYear: offer.yearBuilt,
    details: {
      Balkon: offer.noOfBalconies,
      Liczba_lazienek: offer.noOfBathrooms,
      Ogrodek: offer.garden,
      Wysokosc_apartamentu: offer.headroom
    }
  };

  return newOffer;
};

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
    const data = JSON.stringify({
      amount: listingsList.length,
      data: listingsList
    });

    fs.writeFileSync('public/exportedListingsList.json', data, {
      encoding: 'utf8',
      flag: 'w'
    });

    let counter = 0;
    const getOffersInterval = setInterval(async () => {
      const offer = listingsList[counter];
      const listing = await axios.get(
        `https://api.asariweb.pl/apiSite/listing?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}&id=${offer.id}`
      );

      offer.data = listing.data.data;
      fs.writeFileSync(
        `public/offers/estate-${offer.id}.json`,
        JSON.stringify(transformOffer(offer.data)),
        {
          encoding: 'utf8',
          flag: 'w'
        }
      );

      counter++;
      if (counter === listingsList.length) {
        console.log('End Uploading');
        clearInterval(getOffersInterval);
      }
    }, 5000);
  }

  res.status(200).json({ success: true, processStatus: 'Starting upload' });
};
