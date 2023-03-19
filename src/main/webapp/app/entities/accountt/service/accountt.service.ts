import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAccountt, NewAccountt } from '../accountt.model';

export type PartialUpdateAccountt = Partial<IAccountt> & Pick<IAccountt, 'id'>;

export type EntityResponseType = HttpResponse<IAccountt>;
export type EntityArrayResponseType = HttpResponse<IAccountt[]>;

@Injectable({ providedIn: 'root' })
export class AccounttService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/accountts');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountt: NewAccountt): Observable<EntityResponseType> {
    return this.http.post<IAccountt>(this.resourceUrl, accountt, { observe: 'response' });
  }

  update(accountt: IAccountt): Observable<EntityResponseType> {
    return this.http.put<IAccountt>(`${this.resourceUrl}/${this.getAccounttIdentifier(accountt)}`, accountt, { observe: 'response' });
  }

  partialUpdate(accountt: PartialUpdateAccountt): Observable<EntityResponseType> {
    return this.http.patch<IAccountt>(`${this.resourceUrl}/${this.getAccounttIdentifier(accountt)}`, accountt, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountt>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountt[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAccounttIdentifier(accountt: Pick<IAccountt, 'id'>): number {
    return accountt.id;
  }

  compareAccountt(o1: Pick<IAccountt, 'id'> | null, o2: Pick<IAccountt, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccounttIdentifier(o1) === this.getAccounttIdentifier(o2) : o1 === o2;
  }

  addAccounttToCollectionIfMissing<Type extends Pick<IAccountt, 'id'>>(
    accounttCollection: Type[],
    ...accounttsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountts: Type[] = accounttsToCheck.filter(isPresent);
    if (accountts.length > 0) {
      const accounttCollectionIdentifiers = accounttCollection.map(accounttItem => this.getAccounttIdentifier(accounttItem)!);
      const accounttsToAdd = accountts.filter(accounttItem => {
        const accounttIdentifier = this.getAccounttIdentifier(accounttItem);
        if (accounttCollectionIdentifiers.includes(accounttIdentifier)) {
          return false;
        }
        accounttCollectionIdentifiers.push(accounttIdentifier);
        return true;
      });
      return [...accounttsToAdd, ...accounttCollection];
    }
    return accounttCollection;
  }
}
