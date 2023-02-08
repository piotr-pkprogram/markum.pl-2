export enum ReviewTypes {
  text = "TEXT",
  video = "VIDEO",
}

export type ReviewType = {
  _id: string;
  name: string;
  surname: string;
  review: string;
  image: string;
  rating: number;
  reviewType: ReviewTypes;
}