import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UserrComponent } from './list/userr.component';
import { UserrDetailComponent } from './detail/userr-detail.component';
import { UserrUpdateComponent } from './update/userr-update.component';
import { UserrDeleteDialogComponent } from './delete/userr-delete-dialog.component';
import { UserrRoutingModule } from './route/userr-routing.module';

@NgModule({
  imports: [SharedModule, UserrRoutingModule],
  declarations: [UserrComponent, UserrDetailComponent, UserrUpdateComponent, UserrDeleteDialogComponent],
})
export class UserrModule {}
