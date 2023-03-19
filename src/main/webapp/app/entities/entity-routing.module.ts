import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'jhipsterSampleApplicationApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'organization',
        data: { pageTitle: 'jhipsterSampleApplicationApp.organization.home.title' },
        loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
      },
      {
        path: 'group',
        data: { pageTitle: 'jhipsterSampleApplicationApp.group.home.title' },
        loadChildren: () => import('./group/group.module').then(m => m.GroupModule),
      },
      {
        path: 'userr',
        data: { pageTitle: 'jhipsterSampleApplicationApp.userr.home.title' },
        loadChildren: () => import('./userr/userr.module').then(m => m.UserrModule),
      },
      {
        path: 'accountt',
        data: { pageTitle: 'jhipsterSampleApplicationApp.accountt.home.title' },
        loadChildren: () => import('./accountt/accountt.module').then(m => m.AccounttModule),
      },
      {
        path: 'group-composition',
        data: { pageTitle: 'jhipsterSampleApplicationApp.groupComposition.home.title' },
        loadChildren: () => import('./group-composition/group-composition.module').then(m => m.GroupCompositionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
