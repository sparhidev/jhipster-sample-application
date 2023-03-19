import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { GroupCompositionFormService, GroupCompositionFormGroup } from './group-composition-form.service';
import { IGroupComposition } from '../group-composition.model';
import { GroupCompositionService } from '../service/group-composition.service';

@Component({
  selector: 'jhi-group-composition-update',
  templateUrl: './group-composition-update.component.html',
})
export class GroupCompositionUpdateComponent implements OnInit {
  isSaving = false;
  groupComposition: IGroupComposition | null = null;

  editForm: GroupCompositionFormGroup = this.groupCompositionFormService.createGroupCompositionFormGroup();

  constructor(
    protected groupCompositionService: GroupCompositionService,
    protected groupCompositionFormService: GroupCompositionFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupComposition }) => {
      this.groupComposition = groupComposition;
      if (groupComposition) {
        this.updateForm(groupComposition);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const groupComposition = this.groupCompositionFormService.getGroupComposition(this.editForm);
    if (groupComposition.id !== null) {
      this.subscribeToSaveResponse(this.groupCompositionService.update(groupComposition));
    } else {
      this.subscribeToSaveResponse(this.groupCompositionService.create(groupComposition));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupComposition>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(groupComposition: IGroupComposition): void {
    this.groupComposition = groupComposition;
    this.groupCompositionFormService.resetForm(this.editForm, groupComposition);
  }
}
