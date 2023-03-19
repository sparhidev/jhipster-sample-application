import { IGroup, NewGroup } from './group.model';

export const sampleWithRequiredData: IGroup = {
  id: 82913,
  name: 'interactive',
};

export const sampleWithPartialData: IGroup = {
  id: 96789,
  name: 'Towels withdrawal',
};

export const sampleWithFullData: IGroup = {
  id: 51736,
  name: 'Helena Personal transmitter',
};

export const sampleWithNewData: NewGroup = {
  name: 'Refined methodologies',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
