import { IEstateFields } from 'types/generated/contentful';
import fs from 'fs';
export const saveOffersToJSON = (estates: IEstateFields[]) => {
  const data = JSON.stringify({
    uploadTime: new Date(),
    estates
  });

  fs.writeFileSync('public/offers.json', data);
}

export const checkUploadTime = () => {
  if (fs.readFileSync('public/offers.json').length !== 0) {
    const json = fs.readFileSync('public/offers.json', {encoding:'utf8', flag:'r'});
    const data = JSON.parse(json);
    const time = new Date(data.uploadTime);

    const pastTime = time.getHours() - new Date().getHours();

    if (pastTime < 1)
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