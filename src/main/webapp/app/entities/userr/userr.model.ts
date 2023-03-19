import { ICustomer } from 'app/entities/customer/customer.model';

export interface IUserr {
  id: number;
  name?: string | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewUserr = Omit<IUserr, 'id'> & { id: null };
