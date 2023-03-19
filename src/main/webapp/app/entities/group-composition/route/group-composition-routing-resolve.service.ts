import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGroupComposition } from '../group-composition.model';
import { GroupCompositionService } from '../service/group-composition.service';

@Injectable({ providedIn: 'root' })
export class GroupCompositionRoutingResolveService implements Resolve<IGroupComposition | null> {
  constructor(protected service: GroupCompositionService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroupComposition | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((groupComposition: HttpResponse<IGroupComposition>) => {
          if (groupComposition.body) {
            return of(groupComposition.body);
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
