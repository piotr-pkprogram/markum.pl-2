import transformOffer from 'utils/transformOffers';
import fs from 'fs';
import axios from 'axios';

export default async (listingsList: any[]) => {
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
};
