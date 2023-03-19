import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGroupComposition, NewGroupComposition } from '../group-composition.model';

export type PartialUpdateGroupComposition = Partial<IGroupComposition> & Pick<IGroupComposition, 'id'>;

export type EntityResponseType = HttpResponse<IGroupComposition>;
export type EntityArrayResponseType = HttpResponse<IGroupComposition[]>;

@Injectable({ providedIn: 'root' })
export class GroupCompositionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/group-compositions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(groupComposition: NewGroupComposition): Observable<EntityResponseType> {
    return this.http.post<IGroupComposition>(this.resourceUrl, groupComposition, { observe: 'response' });
  }

  update(groupComposition: IGroupComposition): Observable<EntityResponseType> {
    return this.http.put<IGroupComposition>(
      `${this.resourceUrl}/${this.getGroupCompositionIdentifier(groupComposition)}`,
      groupComposition,
      { observe: 'response' }
    );
  }

  partialUpdate(groupComposition: PartialUpdateGroupComposition): Observable<EntityResponseType> {
    return this.http.patch<IGroupComposition>(
      `${this.resourceUrl}/${this.getGroupCompositionIdentifier(groupComposition)}`,
      groupComposition,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupComposition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupComposition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getGroupCompositionIdentifier(groupComposition: Pick<IGroupComposition, 'id'>): number {
    return groupComposition.id;
  }

  compareGroupComposition(o1: Pick<IGroupComposition, 'id'> | null, o2: Pick<IGroupComposition, 'id'> | null): boolean {
    return o1 && o2 ? this.getGroupCompositionIdentifier(o1) === this.getGroupCompositionIdentifier(o2) : o1 === o2;
  }

  addGroupCompositionToCollectionIfMissing<Type extends Pick<IGroupComposition, 'id'>>(
    groupCompositionCollection: Type[],
    ...groupCompositionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const groupCompositions: Type[] = groupCompositionsToCheck.filter(isPresent);
    if (groupCompositions.length > 0) {
      const groupCompositionCollectionIdentifiers = groupCompositionCollection.map(
        groupCompositionItem => this.getGroupCompositionIdentifier(groupCompositionItem)!
      );
      const groupCompositionsToAdd = groupCompositions.filter(groupCompositionItem => {
        const groupCompositionIdentifier = this.getGroupCompositionIdentifier(groupCompositionItem);
        if (groupCompositionCollectionIdentifiers.includes(groupCompositionIdentifier)) {
          return false;
        }
        groupCompositionCollectionIdentifiers.push(groupCompositionIdentifier);
        return true;
      });
      return [...groupCompositionsToAdd, ...groupCompositionCollection];
    }
    return groupCompositionCollection;
  }
}
