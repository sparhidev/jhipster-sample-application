import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GroupCompositionComponent } from '../list/group-composition.component';
import { GroupCompositionDetailComponent } from '../detail/group-composition-detail.component';
import { GroupCompositionUpdateComponent } from '../update/group-composition-update.component';
import { GroupCompositionRoutingResolveService } from './group-composition-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const groupCompositionRoute: Routes = [
  {
    path: '',
    component: GroupCompositionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GroupCompositionDetailComponent,
    resolve: {
      groupComposition: GroupCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GroupCompositionUpdateComponent,
    resolve: {
      groupComposition: GroupCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GroupCompositionUpdateComponent,
    resolve: {
      groupComposition: GroupCompositionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(groupCompositionRoute)],
  exports: [RouterModule],
})
export class GroupCompositionRoutingModule {}
