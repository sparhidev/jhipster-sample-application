import { IGroupComposition, NewGroupComposition } from './group-composition.model';

export const sampleWithRequiredData: IGroupComposition = {
  id: 76134,
  group: 83849,
  account: 8482,
};

export const sampleWithPartialData: IGroupComposition = {
  id: 91708,
  group: 6378,
  account: 37689,
};

export const sampleWithFullData: IGroupComposition = {
  id: 67486,
  group: 81246,
  account: 70603,
};

export const sampleWithNewData: NewGroupComposition = {
  group: 91692,
  account: 71136,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
