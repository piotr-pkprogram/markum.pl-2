import { EstateType } from 'types/estateType';

export type ListingType = {
  id: string;
  lastUpdated: string;
  data?: EstateType;
};
