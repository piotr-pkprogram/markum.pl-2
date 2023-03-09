// @ts-ignore
import { EstiCRMType } from 'types/EstiCRMType';
import deletePolishChars from 'utils/deletePolishChars';
import axios from 'axios';
import { IEstateFields } from 'types/generated/contentful';
import { promisify } from 'util';
import https from 'https';
import fs from 'fs';
// import Canvas from 'canvas';

const sizeOf = promisify(require('image-size'));

// @ts-ignore
// function isImgUrl(url) {
//   const img = new Canvas.Image();
//   img.src = url;
//   return new Promise((resolve) => {
//     img.onload = () => resolve(true);
//     img.onerror = () => resolve(false);
//   });
// }

export const uploadOffersFromEsti = async (): Promise<IEstateFields[]> => {
  const estiOffers = await axios.get(
    `https://app.esticrm.pl/apiClient/offer/list?company=${process.env.ESTICRM_ID}&token=${process.env.ESTICRM_TOKEN}&take=1000`
  );

  let offers = Array.isArray(estiOffers.data.data)
    ? estiOffers.data.data
    : [
        {
          ...estiOffers.data.data
        }
      ];
  offers = await Promise.all(
    offers
      .filter(
        (offer: EstiCRMType) =>
          offer.contactFirstname === 'Marcin' && offer.contactLastname === 'Kumiszczo'
      )
      .map(async (offer: EstiCRMType) => {
        offer.locationStreetName = offer.locationStreetName
          ? offer.locationStreetName
          : offer.locationPrecinctName;
        offer.locationPrecinctName = offer.locationParentPrecinctName
          ? offer.locationParentPrecinctName
          : offer.locationPrecinctName;

        const link = `/${
          offer.transaction && offer.transaction == 132 ? 'na-wynajem' : 'na-sprzedaz'
        }/${
          offer.locationStreetName
            ? deletePolishChars(offer.locationStreetName).toLowerCase()
            : offer.locationParentPrecinctName
            ? deletePolishChars(offer.locationParentPrecinctName).toLowerCase()
            : ''
        }${
          offer.locationBuildingnumber ? `-${offer.locationBuildingnumber}-` : '-'
        }${deletePolishChars(offer.locationCityName).toLowerCase()}`;

        const newOffer = {
          id: parseInt(offer.id),
          category: offer.transaction && offer.transaction == 132 ? 'FOR_RENT' : 'FOR_SALE',
          link: link,
          desc: offer.descriptionWebsite,
          address: {
            city: offer.locationCityName,
            district: offer.locationParentPrecinctName,
            street: offer.locationStreetName,
            houseNumber: offer.locationBuildingnumber,
            apartmentNumber: offer.locationApartmentnumber
          },
          pictures: offer.pictures,
          tourLink: offer.tourLink,
          videoLink: offer.videoLink,
          price: parseInt(offer.price as string),
          priceForm2: parseInt(offer.pricePermeter as string),
          rent: parseInt(offer.apartmentRent as string),
          area: parseInt(offer.areaTotal as string),
          numOfRooms: parseInt(offer.apartmentRoomNumber),
          constructYear: parseInt(offer.buildingYear),
          details: {
            Balkon: offer.additionalBalcony,
            Liczba_lazienek: offer.apartmentBathroomNumber,
            propFeatures: offer.tagList,
            Wysokosc_apartamentu: offer.apartmentHeight
          }
        };

        return newOffer;
      })
  );

  offers.forEach((offer: IEstateFields) => {
    const theSameLinkOffers = offers.filter((estioffer: IEstateFields) => {
      // @ts-ignore
      if (estioffer?.link) {
        // @ts-ignore
        return estioffer?.link === offer.link;
      } else return false;
    });

    if (theSameLinkOffers.length > 1) {
      theSameLinkOffers.forEach((offer: IEstateFields, index: number) => {
        // @ts-ignore
        offer.link += index > 1 ? `-${index}` : '';
      });
    }
  });

  offers = await Promise.all(
    offers.map(async (offer: IEstateFields) => {
      // @ts-ignore
      offer.images = await Promise.all(
        // @ts-ignore
        offer.pictures.map(async (picture) => {
          const index = picture.lastIndexOf('/') + 1;
          const fileName = picture.substr(index);
          const file = fs.createWriteStream(`public/img/offers/simple/${fileName}`, { flags: 'w' });
          let dimensions;

          // const isImage = await Promise.all(isImgUrl(picture));

          // if (isImage) {
          try {
            await new Promise((resolve) => {
              https.get(picture, async function (res) {
                res.pipe(file);
                dimensions = await sizeOf(`public/img/offers/simple/${fileName}`);
                const chunks_of_data: any[] = [];

                res.on('data', (fragments) => {
                  chunks_of_data.push(fragments);
                });

                res.on('end', () => {
                  const response_body = Buffer.concat(chunks_of_data);

                  resolve(response_body.toString());
                });

                res.on('error', (error) => {
                  console.log(error);
                });
              });
            });

            return {
              // @ts-ignore
              fileName: fileName.replace(`.${dimensions.type}`, ''),
              src: `${process.env.DOMAIN}/img/offers/simple/${fileName}`,
              alt: '',
              dimensions
            };
          } catch {
            return null;
          }
          // } else {
          //   return null;
          // }
        })
      );
      delete offer.pictures;
      offer.images.filter((img) => img != null);

      return offer;
    })
  );

  return offers;
};
