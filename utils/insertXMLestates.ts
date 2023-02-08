// @ts-ignore
import { EstiCRMType } from 'types/EstiCRMType';
import deletePolishChars from 'utils/deletePolishChars';
import contentfulConnect from 'utils/contentfulConnect';
import { Environment } from 'contentful-management';
import axios from 'axios';
import path from 'path';
import { IEstateFields } from 'types/generated/contentful';
import { clearAsyncInterval, setAsyncInterval } from 'utils/asyncIntervals';

const uploadImage = async (image: { src: string; alt: string }) => {
  const environment: Environment = await contentfulConnect();

  const assets = await environment
    .getAssets()
    .then((assets) =>
      assets.items.filter((asset) => asset.fields.file['en-US'].contentType === 'image/jpeg')
    );
  let asset = assets.find((asset) => asset.fields.title['en-US'] === path.basename(image.src));

  if (!asset) {
    try {
      asset = await environment.createAsset({
        fields: {
          title: { 'en-US': path.basename(image.src) },
          description: { 'en-US': '' },
          file: {
            'en-US': {
              contentType: path.basename(image.src).includes('.jpg') ? 'image/jpeg' : 'image/png',
              fileName: path.basename(image.src),
              upload: image.src
            }
          }
        }
      });
      +(await asset.processForLocale('en-US'));
      await asset?.publish();
    } catch (e) {}
  }

  return { sys: { type: 'Link', linkType: 'Asset', id: asset?.sys.id } };
};

const uploadOffer = async (offer: IEstateFields) => {
  const environment: Environment = await contentfulConnect();
  const estateRes = await environment.getEntries({
    content_type: 'estate',
    // @ts-ignore
    'fields.id': offer.id['en-US'],
    limit: 1
  });
  let estate = estateRes.items[0];

  if (!estate) {
    try {
      estate = await environment.createEntry('estate', {
        fields: { ...offer }
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    estate.fields = { ...offer };
    await estate.update();
  }

  if (estate) await estate.publish();
  return estate;
};

const getOffers = async () => {
  // try {
  const estiOffers = await axios.get(
    `https://app.esticrm.pl/apiClient/offer/list?company=${process.env.ESTICRM_ID}&token=${process.env.ESTICRM_TOKEN}&take=600`
  );

  let offers = Array.isArray(estiOffers.data.data)
    ? estiOffers.data.data
    : [{ ...estiOffers.data.data }];
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
          offer.transaction && offer.transaction === 132 ? 'na-wynajem' : 'na-sprzedaz'
        }/${offer.locationStreetName ? deletePolishChars(offer.locationStreetName).toLowerCase() : offer.locationParentPrecinctName ? deletePolishChars(offer.locationParentPrecinctName).toLowerCase() : ''
        }${
          offer.locationBuildingnumber ? `-${offer.locationBuildingnumber}-` : '-'
        }${deletePolishChars(offer.locationCityName).toLowerCase()}`;

        const newOffer = {
          id: { 'en-US': parseInt(offer.id) },
          category: {
            'en-US': offer.transaction && offer.transaction === 132 ? 'FOR_RENT' : 'FOR_SALE'
          },
          link: { 'en-US': link },
          desc: { 'en-US': offer.descriptionWebsite },
          address: {
            'en-US': {
              city: offer.locationCityName,
              district: offer.locationParentPrecinctName,
              street: offer.locationStreetName,
              houseNumber: offer.locationBuildingnumber,
              apartmentNumber: offer.locationApartmentnumber
            }
          },
          images: { 'en-US': offer.pictures.map((picture) => ({ src: picture, alt: '' })) },
          tourLink: { 'en-US': offer.tourLink },
          videoLink: { 'en-US': offer.videoLink },
          price: { 'en-US': parseInt(offer.price as string) },
          priceForm2: { 'en-US': parseInt(offer.pricePermeter as string) },
          rent: { 'en-US': parseInt(offer.apartmentRent as string) },
          area: { 'en-US': parseInt(offer.areaTotal as string) },
          numOfRooms: { 'en-US': parseInt(offer.apartmentRoomNumber) },
          constructYear: { 'en-US': parseInt(offer.buildingYear) },
          details: {
            'en-US': {
              Balkon: offer.additionalBalcony,
              Liczba_lazienek: offer.apartmentBathroomNumber,
              propFeatures: offer.tagList,
              Wysokosc_apartamentu: offer.apartmentHeight
            }
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
        return estioffer?.link['en-US'] === offer.link['en-US'];
      } else return false;
    });

    if (theSameLinkOffers.length > 1) {
      theSameLinkOffers.forEach((offer: IEstateFields, index: number) => {
        // @ts-ignore
        offer.link['en-US'] += index !== 0 ? `-${index}` : '';
      });
    }
  });

  return offers;
  // } catch (e) {
  //   console.log(e);
  // }
};

const deleteOldOffers = async () => {
  const estiOffers = await getOffers();

  const environment: Environment = await contentfulConnect();
  const estateRes = await environment.getEntries({ content_type: 'estate' });
  let contentfulOffers = estateRes.items;

  contentfulOffers = contentfulOffers.filter((offer) => {
    const estiOffer = estiOffers.find((estiOffer: IEstateFields) => {
      // @ts-ignore
      return estiOffer.id['en-US'] === offer.fields.id['en-US'];
    });
    return estiOffer === null || estiOffer === undefined;
  });

  contentfulOffers.forEach(async (offer) => {
    await offer.unpublish();
    await offer.delete();
  });
};

export const insertEstates = async () => {
  let offers = await getOffers();

  offers = await Promise.all(
    offers.map(async (offer: IEstateFields) => {
      let i = 0;
      const interval = setAsyncInterval(async () => {
        // @ts-ignore
        let image = offer.images['en-US'][i];
        if (image) image = await uploadImage(image);
        else {
          await uploadOffer(offer);
          clearAsyncInterval(interval);
        }
        // @ts-ignore
        offer.images['en-US'][i] = image;
        i++;
      }, 60000);
      return offer;
    })
  );

  await deleteOldOffers();
  return offers;
};
