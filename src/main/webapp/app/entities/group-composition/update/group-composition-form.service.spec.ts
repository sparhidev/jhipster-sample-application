import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../group-composition.test-samples';

import { GroupCompositionFormService } from './group-composition-form.service';

describe('GroupComposition Form Service', () => {
  let service: GroupCompositionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupCompositionFormService);
  });

  describe('Service methods', () => {
    describe('createGroupCompositionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createGroupCompositionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            group: expect.any(Object),
            account: expect.any(Object),
          })
        );
      });

      it('passing IGroupComposition should create a new form with FormGroup', () => {
        const formGroup = service.createGroupCompositionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            group: expect.any(Object),
            account: expect.any(Object),
          })
        );
      });
    });

    describe('getGroupComposition', () => {
      it('should return NewGroupComposition for default GroupComposition initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createGroupCompositionFormGroup(sampleWithNewData);

        const groupComposition = service.getGroupComposition(formGroup) as any;

        expect(groupComposition).toMatchObject(sampleWithNewData);
      });

      it('should return NewGroupComposition for empty GroupComposition initial value', () => {
        const formGroup = service.createGroupCompositionFormGroup();

        const groupComposition = service.getGroupComposition(formGroup) as any;

        expect(groupComposition).toMatchObject({});
      });

      it('should return IGroupComposition', () => {
        const formGroup = service.createGroupCompositionFormGroup(sampleWithRequiredData);

        const groupComposition = service.getGroupComposition(formGroup) as any;

        expect(groupComposition).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IGroupComposition should not enable id FormControl', () => {
        const formGroup = service.createGroupCompositionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewGroupComposition should disable id FormControl', () => {
        const formGroup = service.createGroupCompositionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
