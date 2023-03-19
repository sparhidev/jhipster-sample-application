import { IUserr, NewUserr } from './userr.model';

export const sampleWithRequiredData: IUserr = {
  id: 71139,
  name: 'deposit violet Cambridgeshire',
};

export const sampleWithPartialData: IUserr = {
  id: 95048,
  name: 'Card Dollar',
};

export const sampleWithFullData: IUserr = {
  id: 63709,
  name: 'e-commerce Kazakhstan',
};

export const sampleWithNewData: NewUserr = {
  name: 'Kiribati Romania',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
