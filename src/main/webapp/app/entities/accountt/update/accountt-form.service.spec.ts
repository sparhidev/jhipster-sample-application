import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../accountt.test-samples';

import { AccounttFormService } from './accountt-form.service';

describe('Accountt Form Service', () => {
  let service: AccounttFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccounttFormService);
  });

  describe('Service methods', () => {
    describe('createAccounttFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccounttFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            organization: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });

      it('passing IAccountt should create a new form with FormGroup', () => {
        const formGroup = service.createAccounttFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            organization: expect.any(Object),
            user: expect.any(Object),
          })
        );
      });
    });

    describe('getAccountt', () => {
      it('should return NewAccountt for default Accountt initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAccounttFormGroup(sampleWithNewData);

        const accountt = service.getAccountt(formGroup) as any;

        expect(accountt).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountt for empty Accountt initial value', () => {
        const formGroup = service.createAccounttFormGroup();

        const accountt = service.getAccountt(formGroup) as any;

        expect(accountt).toMatchObject({});
      });

      it('should return IAccountt', () => {
        const formGroup = service.createAccounttFormGroup(sampleWithRequiredData);

        const accountt = service.getAccountt(formGroup) as any;

        expect(accountt).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountt should not enable id FormControl', () => {
        const formGroup = service.createAccounttFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountt should disable id FormControl', () => {
        const formGroup = service.createAccounttFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
