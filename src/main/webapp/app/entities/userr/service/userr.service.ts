import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUserr, NewUserr } from '../userr.model';

export type PartialUpdateUserr = Partial<IUserr> & Pick<IUserr, 'id'>;

export type EntityResponseType = HttpResponse<IUserr>;
export type EntityArrayResponseType = HttpResponse<IUserr[]>;

@Injectable({ providedIn: 'root' })
export class UserrService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/userrs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(userr: NewUserr): Observable<EntityResponseType> {
    return this.http.post<IUserr>(this.resourceUrl, userr, { observe: 'response' });
  }

  update(userr: IUserr): Observable<EntityResponseType> {
    return this.http.put<IUserr>(`${this.resourceUrl}/${this.getUserrIdentifier(userr)}`, userr, { observe: 'response' });
  }

  partialUpdate(userr: PartialUpdateUserr): Observable<EntityResponseType> {
    return this.http.patch<IUserr>(`${this.resourceUrl}/${this.getUserrIdentifier(userr)}`, userr, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUserr>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUserr[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getUserrIdentifier(userr: Pick<IUserr, 'id'>): number {
    return userr.id;
  }

  compareUserr(o1: Pick<IUserr, 'id'> | null, o2: Pick<IUserr, 'id'> | null): boolean {
    return o1 && o2 ? this.getUserrIdentifier(o1) === this.getUserrIdentifier(o2) : o1 === o2;
  }

  addUserrToCollectionIfMissing<Type extends Pick<IUserr, 'id'>>(
    userrCollection: Type[],
    ...userrsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const userrs: Type[] = userrsToCheck.filter(isPresent);
    if (userrs.length > 0) {
      const userrCollectionIdentifiers = userrCollection.map(userrItem => this.getUserrIdentifier(userrItem)!);
      const userrsToAdd = userrs.filter(userrItem => {
        const userrIdentifier = this.getUserrIdentifier(userrItem);
        if (userrCollectionIdentifiers.includes(userrIdentifier)) {
          return false;
        }
        userrCollectionIdentifiers.push(userrIdentifier);
        return true;
      });
      return [...userrsToAdd, ...userrCollection];
    }
    return userrCollection;
  }
}
