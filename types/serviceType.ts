type Step = {
  _id: string;
  name: string;
  restOfName?: string;
  icon: string;
}

type Stage = {
  _id: string;
  title: string;
  steps: Step[]
}

export type ServiceType = {
  _id: string;
  metaDesc?: string;
  created: Date | string;
  name: string;
  desc: string;
  shortDesc: string;
  icon: string;
  link: string;
  process: Stage[];
}