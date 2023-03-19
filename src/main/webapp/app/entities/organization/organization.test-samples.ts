import { IOrganization, NewOrganization } from './organization.model';

export const sampleWithRequiredData: IOrganization = {
  id: 12784,
  name: 'Automated Rial',
};

export const sampleWithPartialData: IOrganization = {
  id: 57434,
  name: 'Utah',
  environment: 27486,
};

export const sampleWithFullData: IOrganization = {
  id: 85104,
  name: 'Fantastic systems',
  environment: 76426,
};

export const sampleWithNewData: NewOrganization = {
  name: 'disintermediate quantifying',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
