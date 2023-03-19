export interface ICustomer {
  id: number;
  name?: string | null;
  shortDescription?: string | null;
}

export type NewCustomer = Omit<ICustomer, 'id'> & { id: null };
