export enum EstateCategory {
  forSale = 'FOR_SALE',
  forRent = 'FOR_RENT'
}

export type EstateType = {
  _id: string;
  id: number;
  category: EstateCategory | string;
  link: string;
  desc: string;
  metaDesc?: string;
  address: {
    city: string;
    district: string;
    street: string;
    houseNumber: number;
    apartmentNumber?: number;
  };
  images: {
    src: string;
    alt: string;
    dimensions: {
      width: number;
      height: number;
    };
  }[];
  tourLink: string;
  videoLink: string;
  price: number | string;
  priceForm2: number | string;
  rent?: number | string;
  area: number;
  numOfRooms: number;
  constructYear: number;
  details: {
    Typ_kuchni: string;
    Balkon: number;
    Liczba_lazienek: number;
    propFeatures: string;
    Wysokosc_apartamentu: number;
  };
};
