import transformOffer from 'utils/transformOffers';
import fs from 'fs';
import axios from 'axios';
import { ListingType } from 'types/listingType';

const updateExportedListOffers = (listingsList: any[]) => {
  const data = JSON.stringify({
    uploadDate: new Date(),
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
      const listing = await axios.get(
          `https://api.asariweb.pl/apiSite/listing?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}&id=${offer.id}`
        );

      if (newDate.getTime() > lastDate.getTime() && listing.data.data.user.email == 'marcin.kumiszczo@home-estate.pl') {
          fs.writeFileSync(
            `public/offers/estate-${offer.id}.json`,
            JSON.stringify(transformOffer(listing.data.data)),
            { encoding: 'utf8', flag: 'w' }
          );
      } else if (listing.data.data.user.email != 'marcin.kumiszczo@home-estate.pl') {
          listingsList = listingsList.filter(listing2 => listing2.id != listing.data.data.id);
          // console.log(listing.data.data.user.email, listingsList.length);
      }
    } else {
      const listing = await axios.get(
        `https://api.asariweb.pl/apiSite/listing?userId=${process.env.ASARI_ID}&loginToken=${process.env.ASARI_TOKEN}&id=${offer.id}`
      );

      if (listing.data.data.user.email == 'marcin.kumiszczo@home-estate.pl') {
        fs.writeFileSync(
          `public/offers/estate-${offer.id}.json`,
          JSON.stringify(transformOffer(listing.data.data)),
          { encoding: 'utf8', flag: 'w' }
        );
      } else {
        listingsList = listingsList.filter(listing2 => listing2.id != listing.data.data.id);
        // console.log(listing.data.data.user.email, listingsList.length);
      }
    }

    counter++;
    if (counter === listingsList.length) {
      updateExportedListOffers(listingsList);
      console.log('End Uploading');
      clearInterval(updateOffersInterval);
    }
  }, 5000);
};
