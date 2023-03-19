import { IAccountt, NewAccountt } from './accountt.model';

export const sampleWithRequiredData: IAccountt = {
  id: 72886,
  name: 'Principal Towels',
};

export const sampleWithPartialData: IAccountt = {
  id: 73958,
  name: 'gold',
};

export const sampleWithFullData: IAccountt = {
  id: 41643,
  name: 'Direct Tajikistan index',
};

export const sampleWithNewData: NewAccountt = {
  name: 'Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
