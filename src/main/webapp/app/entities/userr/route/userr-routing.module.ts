import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UserrComponent } from '../list/userr.component';
import { UserrDetailComponent } from '../detail/userr-detail.component';
import { UserrUpdateComponent } from '../update/userr-update.component';
import { UserrRoutingResolveService } from './userr-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const userrRoute: Routes = [
  {
    path: '',
    component: UserrComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UserrDetailComponent,
    resolve: {
      userr: UserrRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UserrUpdateComponent,
    resolve: {
      userr: UserrRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UserrUpdateComponent,
    resolve: {
      userr: UserrRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userrRoute)],
  exports: [RouterModule],
})
export class UserrRoutingModule {}
