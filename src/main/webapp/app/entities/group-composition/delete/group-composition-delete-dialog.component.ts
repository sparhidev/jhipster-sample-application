import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGroupComposition } from '../group-composition.model';
import { GroupCompositionService } from '../service/group-composition.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './group-composition-delete-dialog.component.html',
})
export class GroupCompositionDeleteDialogComponent {
  groupComposition?: IGroupComposition;

  constructor(protected groupCompositionService: GroupCompositionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.groupCompositionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
