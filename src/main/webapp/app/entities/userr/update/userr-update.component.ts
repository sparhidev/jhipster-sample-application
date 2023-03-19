import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserrFormService, UserrFormGroup } from './userr-form.service';
import { IUserr } from '../userr.model';
import { UserrService } from '../service/userr.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';

@Component({
  selector: 'jhi-userr-update',
  templateUrl: './userr-update.component.html',
})
export class UserrUpdateComponent implements OnInit {
  isSaving = false;
  userr: IUserr | null = null;

  customersSharedCollection: ICustomer[] = [];

  editForm: UserrFormGroup = this.userrFormService.createUserrFormGroup();

  constructor(
    protected userrService: UserrService,
    protected userrFormService: UserrFormService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userr }) => {
      this.userr = userr;
      if (userr) {
        this.updateForm(userr);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userr = this.userrFormService.getUserr(this.editForm);
    if (userr.id !== null) {
      this.subscribeToSaveResponse(this.userrService.update(userr));
    } else {
      this.subscribeToSaveResponse(this.userrService.create(userr));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserr>>): void {
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

  protected updateForm(userr: IUserr): void {
    this.userr = userr;
    this.userrFormService.resetForm(this.editForm, userr);

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      userr.customer
    );
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) => this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.userr?.customer))
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));
  }
}
