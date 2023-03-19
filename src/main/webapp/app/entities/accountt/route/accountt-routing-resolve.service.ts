import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountt } from '../accountt.model';
import { AccounttService } from '../service/accountt.service';

@Injectable({ providedIn: 'root' })
export class AccounttRoutingResolveService implements Resolve<IAccountt | null> {
  constructor(protected service: AccounttService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountt | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountt: HttpResponse<IAccountt>) => {
          if (accountt.body) {
            return of(accountt.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
