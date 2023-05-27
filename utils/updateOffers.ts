import transformOffer from 'utils/transformOffers';
import fs from 'fs';
import axios from 'axios';
import { ListingType } from 'types/listingType';

const updateExportedListOffers = (listingsList: any[]) => {
  const data = JSON.stringify({
    amount: listingsList.length,
    data: listingsList
  });

  fs.writeFileSync('public/exportedListingsList.json', data, {
    encoding: 'utf8',
    flag: 'w'
  });
};

export default async (listingsList: any[]) => {
  const json = fs.readFileSync('public/exportedListingsList.json', {
    encoding: 'utf8',
    flag: 'r'
  });
  const exportedListingsData = JSON.parse(json);

  let counter = 0;
  const updateOffersInterval = setInterval(async () => {
    const offer = listingsList[counter];
    const estate = exportedListingsData.data.filter(
      (listing: ListingType) => listing.id === offer.id
    );

    if (estate.length > 0) {
      const newDate = new Date(offer.lastUpdated);
      const lastDate = new Date(estate[0].lastUpdated);

      if (newDate.getTime() > lastDate.getTime()) {
        const listing = await axios.get(
          `https://api.asariweb.pl/apiSite/listing?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}&id=${offer.id}`
        );

        offer.data = listing.data.data;
        fs.writeFileSync(
          `public/offers/estate-${offer.id}.json`,
          JSON.stringify(transformOffer(offer.data)),
          { encoding: 'utf8', flag: 'w' }
        );
      }
    } else {
      const listing = await axios.get(
        `https://api.asariweb.pl/apiSite/listing?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}&id=${offer.id}`
      );

      offer.data = listing.data.data;
      fs.writeFileSync(
        `public/offers/estate-${offer.id}.json`,
        JSON.stringify(transformOffer(offer.data)),
        { encoding: 'utf8', flag: 'w' }
      );
    }

    counter++;
    if (counter === listingsList.length) {
      updateExportedListOffers(listingsList);
      console.log('End Uploading');
      clearInterval(updateOffersInterval);
    }
  }, 5000);
};
