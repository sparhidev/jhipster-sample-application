import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGroupComposition, NewGroupComposition } from '../group-composition.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGroupComposition for edit and NewGroupCompositionFormGroupInput for create.
 */
type GroupCompositionFormGroupInput = IGroupComposition | PartialWithRequiredKeyOf<NewGroupComposition>;

type GroupCompositionFormDefaults = Pick<NewGroupComposition, 'id'>;

type GroupCompositionFormGroupContent = {
  id: FormControl<IGroupComposition['id'] | NewGroupComposition['id']>;
  group: FormControl<IGroupComposition['group']>;
  account: FormControl<IGroupComposition['account']>;
};

export type GroupCompositionFormGroup = FormGroup<GroupCompositionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GroupCompositionFormService {
  createGroupCompositionFormGroup(groupComposition: GroupCompositionFormGroupInput = { id: null }): GroupCompositionFormGroup {
    const groupCompositionRawValue = {
      ...this.getFormDefaults(),
      ...groupComposition,
    };
    return new FormGroup<GroupCompositionFormGroupContent>({
      id: new FormControl(
        { value: groupCompositionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      group: new FormControl(groupCompositionRawValue.group, {
        validators: [Validators.required],
      }),
      account: new FormControl(groupCompositionRawValue.account, {
        validators: [Validators.required],
      }),
    });
  }

  getGroupComposition(form: GroupCompositionFormGroup): IGroupComposition | NewGroupComposition {
    return form.getRawValue() as IGroupComposition | NewGroupComposition;
  }

  resetForm(form: GroupCompositionFormGroup, groupComposition: GroupCompositionFormGroupInput): void {
    const groupCompositionRawValue = { ...this.getFormDefaults(), ...groupComposition };
    form.reset(
      {
        ...groupCompositionRawValue,
        id: { value: groupCompositionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GroupCompositionFormDefaults {
    return {
      id: null,
    };
  }
}
