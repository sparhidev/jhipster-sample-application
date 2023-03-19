import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUserr } from '../userr.model';
import { UserrService } from '../service/userr.service';

@Injectable({ providedIn: 'root' })
export class UserrRoutingResolveService implements Resolve<IUserr | null> {
  constructor(protected service: UserrService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUserr | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((userr: HttpResponse<IUserr>) => {
          if (userr.body) {
            return of(userr.body);
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
