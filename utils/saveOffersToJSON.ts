import { IEstateFields } from 'types/generated/contentful';
import fs from 'fs';

export const saveOffersToJSON = (estates: IEstateFields[]) => {
  const data = JSON.stringify({
    uploadTime: new Date(),
    estates
  });

  fs.writeFileSync('public/offers.json', data, {encoding:'utf8', flag:'w'});
}

export const checkUploadTime = () => {
  if (fs.readFileSync('public/offers.json').length !== 0) {
    const json = fs.readFileSync('public/offers.json', {encoding:'utf8', flag:'r'});
    const data = JSON.parse(json);
    const time = new Date(data.uploadTime);

    let pastTime = new Date().getTime() - time.getTime();
    pastTime = Math.floor(((pastTime / 1000) / 60) / 60);

    if (pastTime < 2)
      return {
        checkTime: true,
        estates: data.estates
      }
    else
      return {
        checkTime: false,
        estates: data.estates
      }
  } else
    return {
      checkTime: false,
      estates: []
    }
};