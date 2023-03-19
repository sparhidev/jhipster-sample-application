import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AccounttFormService, AccounttFormGroup } from './accountt-form.service';
import { IAccountt } from '../accountt.model';
import { AccounttService } from '../service/accountt.service';
import { IOrganization } from 'app/entities/organization/organization.model';
import { OrganizationService } from 'app/entities/organization/service/organization.service';
import { IUserr } from 'app/entities/userr/userr.model';
import { UserrService } from 'app/entities/userr/service/userr.service';

@Component({
  selector: 'jhi-accountt-update',
  templateUrl: './accountt-update.component.html',
})
export class AccounttUpdateComponent implements OnInit {
  isSaving = false;
  accountt: IAccountt | null = null;

  organizationsSharedCollection: IOrganization[] = [];
  userrsSharedCollection: IUserr[] = [];

  editForm: AccounttFormGroup = this.accounttFormService.createAccounttFormGroup();

  constructor(
    protected accounttService: AccounttService,
    protected accounttFormService: AccounttFormService,
    protected organizationService: OrganizationService,
    protected userrService: UserrService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareOrganization = (o1: IOrganization | null, o2: IOrganization | null): boolean =>
    this.organizationService.compareOrganization(o1, o2);

  compareUserr = (o1: IUserr | null, o2: IUserr | null): boolean => this.userrService.compareUserr(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ accountt }) => {
      this.accountt = accountt;
      if (accountt) {
        this.updateForm(accountt);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const accountt = this.accounttFormService.getAccountt(this.editForm);
    if (accountt.id !== null) {
      this.subscribeToSaveResponse(this.accounttService.update(accountt));
    } else {
      this.subscribeToSaveResponse(this.accounttService.create(accountt));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAccountt>>): void {
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

  protected updateForm(accountt: IAccountt): void {
    this.accountt = accountt;
    this.accounttFormService.resetForm(this.editForm, accountt);

    this.organizationsSharedCollection = this.organizationService.addOrganizationToCollectionIfMissing<IOrganization>(
      this.organizationsSharedCollection,
      accountt.organization
    );
    this.userrsSharedCollection = this.userrService.addUserrToCollectionIfMissing<IUserr>(this.userrsSharedCollection, accountt.user);
  }

  protected loadRelationshipsOptions(): void {
    this.organizationService
      .query()
      .pipe(map((res: HttpResponse<IOrganization[]>) => res.body ?? []))
      .pipe(
        map((organizations: IOrganization[]) =>
          this.organizationService.addOrganizationToCollectionIfMissing<IOrganization>(organizations, this.accountt?.organization)
        )
      )
      .subscribe((organizations: IOrganization[]) => (this.organizationsSharedCollection = organizations));

    this.userrService
      .query()
      .pipe(map((res: HttpResponse<IUserr[]>) => res.body ?? []))
      .pipe(map((userrs: IUserr[]) => this.userrService.addUserrToCollectionIfMissing<IUserr>(userrs, this.accountt?.user)))
      .subscribe((userrs: IUserr[]) => (this.userrsSharedCollection = userrs));
  }
}
