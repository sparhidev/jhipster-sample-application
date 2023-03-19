import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../userr.test-samples';

import { UserrFormService } from './userr-form.service';

describe('Userr Form Service', () => {
  let service: UserrFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserrFormService);
  });

  describe('Service methods', () => {
    describe('createUserrFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserrFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            customer: expect.any(Object),
          })
        );
      });

      it('passing IUserr should create a new form with FormGroup', () => {
        const formGroup = service.createUserrFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            customer: expect.any(Object),
          })
        );
      });
    });

    describe('getUserr', () => {
      it('should return NewUserr for default Userr initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createUserrFormGroup(sampleWithNewData);

        const userr = service.getUserr(formGroup) as any;

        expect(userr).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserr for empty Userr initial value', () => {
        const formGroup = service.createUserrFormGroup();

        const userr = service.getUserr(formGroup) as any;

        expect(userr).toMatchObject({});
      });

      it('should return IUserr', () => {
        const formGroup = service.createUserrFormGroup(sampleWithRequiredData);

        const userr = service.getUserr(formGroup) as any;

        expect(userr).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserr should not enable id FormControl', () => {
        const formGroup = service.createUserrFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserr should disable id FormControl', () => {
        const formGroup = service.createUserrFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
