import { EstateType } from 'types/estateType';
import deletePolishChars from 'utils/deletePolishChars';

export default (offer: any) => {
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
    createdDate: offer.dateCreated,
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
    area: {
      total: offer.totalArea,
      lot: offer.lotArea
    },
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
