export interface IGroupComposition {
  id: number;
  group?: number | null;
  account?: number | null;
}

export type NewGroupComposition = Omit<IGroupComposition, 'id'> & { id: null };
