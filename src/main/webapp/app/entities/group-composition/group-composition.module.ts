import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GroupCompositionComponent } from './list/group-composition.component';
import { GroupCompositionDetailComponent } from './detail/group-composition-detail.component';
import { GroupCompositionUpdateComponent } from './update/group-composition-update.component';
import { GroupCompositionDeleteDialogComponent } from './delete/group-composition-delete-dialog.component';
import { GroupCompositionRoutingModule } from './route/group-composition-routing.module';

@NgModule({
  imports: [SharedModule, GroupCompositionRoutingModule],
  declarations: [
    GroupCompositionComponent,
    GroupCompositionDetailComponent,
    GroupCompositionUpdateComponent,
    GroupCompositionDeleteDialogComponent,
  ],
})
export class GroupCompositionModule {}
