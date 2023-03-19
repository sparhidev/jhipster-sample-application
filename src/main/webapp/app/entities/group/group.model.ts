import { IOrganization } from 'app/entities/organization/organization.model';

export interface IGroup {
  id: number;
  name?: string | null;
  organization?: Pick<IOrganization, 'id'> | null;
}

export type NewGroup = Omit<IGroup, 'id'> & { id: null };
