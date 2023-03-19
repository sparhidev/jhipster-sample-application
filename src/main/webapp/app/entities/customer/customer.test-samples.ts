import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 24379,
  name: 'Operations',
};

export const sampleWithPartialData: ICustomer = {
  id: 95257,
  name: 'ADP scalable',
};

export const sampleWithFullData: ICustomer = {
  id: 54302,
  name: 'Loan generating',
  shortDescription: 'Generic',
};

export const sampleWithNewData: NewCustomer = {
  name: 'innovative THX Estonia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
