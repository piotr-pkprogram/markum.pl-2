// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface IContactsFields {
  _id: string;
  /** Name */
  name: string;

  /** Phone Number */
  phoneNumber: string;
}

/** Numery telefonu zostawione na stronie */

export interface IContacts extends Entry<IContactsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'contacts';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface Image {
  fileName: string;
  src: string,
  alt: string,
  dimensions: {
    height: number,
    width: number,
    type: string
  }
}

export interface IEstateFields {
  id: number;
  _id: string;

  /** Category */
  category: 'FOR_SALE' | 'FOR_RENT';

  /** Link */
  link: string;

  /** Desc */
  desc: string;

  /** Address */
  address: Record<string, any>;

  /** Images */
  images: Image[];

  pictures?: string[];

  /** Price */
  price: string;

  /** Price For m2 */
  priceForm2: string;

  /** Rent */
  rent?: number | undefined;

  /** Area */
  area: number;

  /** Number Of Rooms */
  numOfRooms: number;

  /** Construct Year */
  constructYear: number;

  /** Details */
  details?: Record<string, any> | undefined;
}

/** Oferta Nieruchomości */

export interface IEstate extends Entry<IEstateFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'estate';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IQuestionsFields {
  _id: string;
  id: number;

  /** Question */
  question: string;

  /** Answer */
  answer: string;
}

/** Pytania w sekcji FAQ */

export interface IQuestions extends Entry<IQuestionsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'questions';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IReviewsFields {
  _id: string;
  id: number;

  /** Name */
  name: string;

  /** Surname */
  surname: string;

  /** Review */
  review: string;

  /** Image */
  image?: Asset | undefined | string;

  /** Rating */
  rating: number;

  /** Review Type */
  reviewType: 'TEXT' | 'VIDEO';
}

/** Opinie Twoich klientów */

export interface IReviews extends Entry<IReviewsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'reviews';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IServicesFields {
  _id: string;
  id: number;

  /** Name */
  name: string;

  /** Desc */
  desc: string;
  
  created: Date | string;
  updated: Date | string;

  /** Short Desc */
  shortDesc: string;

  /** Icon */
  icon: Asset;

  /** Link */
  link: string;

  /** Process */
  process: IStages[];
}

/** Usługi, które oferujesz. */

export interface IServices extends Entry<IServicesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'services';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IStagesFields {
  _id: string;
  /** Title */
  title: string;

  /** Steps */
  steps: ISteps[];
}

/** Etapy procesu danej usługi */

export interface IStages extends Entry<IStagesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'stages';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export interface IStepsFields {
  /** Name */
  name: string;

  /** Rest Of Name */
  restOfName: string;

  /** Icon */
  icon: Asset;
}

/** Kroki etapów Twoich usług */

export interface ISteps extends Entry<IStepsFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: 'steps';
        linkType: 'ContentType';
        type: 'Link';
      };
    };
  };
}

export type CONTENT_TYPE =
  | 'contacts'
  | 'estate'
  | 'questions'
  | 'reviews'
  | 'services'
  | 'stages'
  | 'steps';

export type LOCALE_CODE = 'en-US';

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US';
