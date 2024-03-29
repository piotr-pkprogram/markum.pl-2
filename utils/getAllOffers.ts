import transformOffer from 'utils/transformOffers';
import fs from 'fs';
import axios from 'axios';

export default async (listingsList: any[]) => {
  const data = JSON.stringify({
    uploadDate: new Date(),
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
    
    if (listing.data.data.user.email == "marcin.kumiszczo@home-estate.pl") {
      fs.writeFileSync(
        `public/offers/estate-${offer.id}.json`,
        JSON.stringify(transformOffer(listing.data.data)),
        {
          encoding: 'utf8',
          flag: 'w'
        }
      );
    } else {
      delete listingsList[counter];
    }

    counter++;
    if (counter === listingsList.length) {
      console.log('End Uploading');
      clearInterval(getOffersInterval);
    }
  }, 5000);
};
