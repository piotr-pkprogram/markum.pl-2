export enum EstateCategory {
  forSale = 'FOR_SALE',
  forRent = 'FOR_RENT'
}

export type EstateType = {
  id: number;
  createdDate: Date | string;
  updatedDate: Date | string;
  adsName: string;
  category: EstateCategory | string;
  link: string;
  desc: string;
  metaDesc?: string;
  address: {
    city: string;
    district: string;
    street: string;
  };
  images: {
    id: number;
    src: string;
    description: string;
    dimensions?: {
      width: number;
      height: number;
    };
  }[];
  tourLink: string;
  videoLink: string;
  price: number | string;
  priceForm2: number | string;
  area: {
    total: number;
    lot: number;
  };
  numOfRooms: number;
  constructYear: number;
  details: {
    Balkon: number;
    Liczba_lazienek: number;
    Ogrodek: boolean;
    Wysokosc_apartamentu: number;
  };
};
