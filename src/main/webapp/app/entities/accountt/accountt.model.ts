import { IOrganization } from 'app/entities/organization/organization.model';
import { IUserr } from 'app/entities/userr/userr.model';

export interface IAccountt {
  id: number;
  name?: string | null;
  organization?: Pick<IOrganization, 'id'> | null;
  user?: Pick<IUserr, 'id'> | null;
}

export type NewAccountt = Omit<IAccountt, 'id'> & { id: null };
