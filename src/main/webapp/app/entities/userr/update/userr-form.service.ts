import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUserr, NewUserr } from '../userr.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUserr for edit and NewUserrFormGroupInput for create.
 */
type UserrFormGroupInput = IUserr | PartialWithRequiredKeyOf<NewUserr>;

type UserrFormDefaults = Pick<NewUserr, 'id'>;

type UserrFormGroupContent = {
  id: FormControl<IUserr['id'] | NewUserr['id']>;
  name: FormControl<IUserr['name']>;
  customer: FormControl<IUserr['customer']>;
};

export type UserrFormGroup = FormGroup<UserrFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UserrFormService {
  createUserrFormGroup(userr: UserrFormGroupInput = { id: null }): UserrFormGroup {
    const userrRawValue = {
      ...this.getFormDefaults(),
      ...userr,
    };
    return new FormGroup<UserrFormGroupContent>({
      id: new FormControl(
        { value: userrRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(userrRawValue.name, {
        validators: [Validators.required],
      }),
      customer: new FormControl(userrRawValue.customer),
    });
  }

  getUserr(form: UserrFormGroup): IUserr | NewUserr {
    return form.getRawValue() as IUserr | NewUserr;
  }

  resetForm(form: UserrFormGroup, userr: UserrFormGroupInput): void {
    const userrRawValue = { ...this.getFormDefaults(), ...userr };
    form.reset(
      {
        ...userrRawValue,
        id: { value: userrRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UserrFormDefaults {
    return {
      id: null,
    };
  }
}
