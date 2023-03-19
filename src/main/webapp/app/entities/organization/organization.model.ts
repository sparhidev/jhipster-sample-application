import { ICustomer } from 'app/entities/customer/customer.model';

export interface IOrganization {
  id: number;
  name?: string | null;
  environment?: number | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewOrganization = Omit<IOrganization, 'id'> & { id: null };
