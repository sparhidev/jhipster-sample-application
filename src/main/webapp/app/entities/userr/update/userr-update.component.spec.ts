import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { UserrFormService } from './userr-form.service';
import { UserrService } from '../service/userr.service';
import { IUserr } from '../userr.model';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';

import { UserrUpdateComponent } from './userr-update.component';

describe('Userr Management Update Component', () => {
  let comp: UserrUpdateComponent;
  let fixture: ComponentFixture<UserrUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let userrFormService: UserrFormService;
  let userrService: UserrService;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [UserrUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(UserrUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(UserrUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    userrFormService = TestBed.inject(UserrFormService);
    userrService = TestBed.inject(UserrService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Customer query and add missing value', () => {
      const userr: IUserr = { id: 456 };
      const customer: ICustomer = { id: 24590 };
      userr.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 18300 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ userr });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining)
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const userr: IUserr = { id: 456 };
      const customer: ICustomer = { id: 87913 };
      userr.customer = customer;

      activatedRoute.data = of({ userr });
      comp.ngOnInit();

      expect(comp.customersSharedCollection).toContain(customer);
      expect(comp.userr).toEqual(userr);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserr>>();
      const userr = { id: 123 };
      jest.spyOn(userrFormService, 'getUserr').mockReturnValue(userr);
      jest.spyOn(userrService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userr });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userr }));
      saveSubject.complete();

      // THEN
      expect(userrFormService.getUserr).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(userrService.update).toHaveBeenCalledWith(expect.objectContaining(userr));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserr>>();
      const userr = { id: 123 };
      jest.spyOn(userrFormService, 'getUserr').mockReturnValue({ id: null });
      jest.spyOn(userrService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userr: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: userr }));
      saveSubject.complete();

      // THEN
      expect(userrFormService.getUserr).toHaveBeenCalled();
      expect(userrService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IUserr>>();
      const userr = { id: 123 };
      jest.spyOn(userrService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ userr });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(userrService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCustomer', () => {
      it('Should forward to customerService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
