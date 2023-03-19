import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountt, NewAccountt } from '../accountt.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountt for edit and NewAccounttFormGroupInput for create.
 */
type AccounttFormGroupInput = IAccountt | PartialWithRequiredKeyOf<NewAccountt>;

type AccounttFormDefaults = Pick<NewAccountt, 'id'>;

type AccounttFormGroupContent = {
  id: FormControl<IAccountt['id'] | NewAccountt['id']>;
  name: FormControl<IAccountt['name']>;
  organization: FormControl<IAccountt['organization']>;
  user: FormControl<IAccountt['user']>;
};

export type AccounttFormGroup = FormGroup<AccounttFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccounttFormService {
  createAccounttFormGroup(accountt: AccounttFormGroupInput = { id: null }): AccounttFormGroup {
    const accounttRawValue = {
      ...this.getFormDefaults(),
      ...accountt,
    };
    return new FormGroup<AccounttFormGroupContent>({
      id: new FormControl(
        { value: accounttRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(accounttRawValue.name, {
        validators: [Validators.required],
      }),
      organization: new FormControl(accounttRawValue.organization),
      user: new FormControl(accounttRawValue.user),
    });
  }

  getAccountt(form: AccounttFormGroup): IAccountt | NewAccountt {
    return form.getRawValue() as IAccountt | NewAccountt;
  }

  resetForm(form: AccounttFormGroup, accountt: AccounttFormGroupInput): void {
    const accounttRawValue = { ...this.getFormDefaults(), ...accountt };
    form.reset(
      {
        ...accounttRawValue,
        id: { value: accounttRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccounttFormDefaults {
    return {
      id: null,
    };
  }
}
