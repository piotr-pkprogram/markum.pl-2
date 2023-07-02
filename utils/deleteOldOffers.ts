import fs from 'fs';

export default (listingsList: any[]) => {
  const files = fs.readdirSync('public/offers');
  const offersIds: number[] = [];

  listingsList.forEach((offer) => offersIds.push(offer.id));
  files.forEach((file) => {
    const offerId = file.split('-')[1].split('.')[0];
    if (!offersIds.includes(parseInt(offerId))) {
      fs.unlinkSync(`public/offers/${file}`);
    }
  });
  console.log('Delete old offers');
};
