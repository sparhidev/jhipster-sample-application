import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { AccounttFormService } from './accountt-form.service';
import { AccounttService } from '../service/accountt.service';
import { IAccountt } from '../accountt.model';
import { IOrganization } from 'app/entities/organization/organization.model';
import { OrganizationService } from 'app/entities/organization/service/organization.service';
import { IUserr } from 'app/entities/userr/userr.model';
import { UserrService } from 'app/entities/userr/service/userr.service';

import { AccounttUpdateComponent } from './accountt-update.component';

describe('Accountt Management Update Component', () => {
  let comp: AccounttUpdateComponent;
  let fixture: ComponentFixture<AccounttUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accounttFormService: AccounttFormService;
  let accounttService: AccounttService;
  let organizationService: OrganizationService;
  let userrService: UserrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [AccounttUpdateComponent],
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
      .overrideTemplate(AccounttUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccounttUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accounttFormService = TestBed.inject(AccounttFormService);
    accounttService = TestBed.inject(AccounttService);
    organizationService = TestBed.inject(OrganizationService);
    userrService = TestBed.inject(UserrService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Organization query and add missing value', () => {
      const accountt: IAccountt = { id: 456 };
      const organization: IOrganization = { id: 2870 };
      accountt.organization = organization;

      const organizationCollection: IOrganization[] = [{ id: 67985 }];
      jest.spyOn(organizationService, 'query').mockReturnValue(of(new HttpResponse({ body: organizationCollection })));
      const additionalOrganizations = [organization];
      const expectedCollection: IOrganization[] = [...additionalOrganizations, ...organizationCollection];
      jest.spyOn(organizationService, 'addOrganizationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountt });
      comp.ngOnInit();

      expect(organizationService.query).toHaveBeenCalled();
      expect(organizationService.addOrganizationToCollectionIfMissing).toHaveBeenCalledWith(
        organizationCollection,
        ...additionalOrganizations.map(expect.objectContaining)
      );
      expect(comp.organizationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Userr query and add missing value', () => {
      const accountt: IAccountt = { id: 456 };
      const user: IUserr = { id: 45838 };
      accountt.user = user;

      const userrCollection: IUserr[] = [{ id: 72498 }];
      jest.spyOn(userrService, 'query').mockReturnValue(of(new HttpResponse({ body: userrCollection })));
      const additionalUserrs = [user];
      const expectedCollection: IUserr[] = [...additionalUserrs, ...userrCollection];
      jest.spyOn(userrService, 'addUserrToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountt });
      comp.ngOnInit();

      expect(userrService.query).toHaveBeenCalled();
      expect(userrService.addUserrToCollectionIfMissing).toHaveBeenCalledWith(
        userrCollection,
        ...additionalUserrs.map(expect.objectContaining)
      );
      expect(comp.userrsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountt: IAccountt = { id: 456 };
      const organization: IOrganization = { id: 71756 };
      accountt.organization = organization;
      const user: IUserr = { id: 73074 };
      accountt.user = user;

      activatedRoute.data = of({ accountt });
      comp.ngOnInit();

      expect(comp.organizationsSharedCollection).toContain(organization);
      expect(comp.userrsSharedCollection).toContain(user);
      expect(comp.accountt).toEqual(accountt);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountt>>();
      const accountt = { id: 123 };
      jest.spyOn(accounttFormService, 'getAccountt').mockReturnValue(accountt);
      jest.spyOn(accounttService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountt }));
      saveSubject.complete();

      // THEN
      expect(accounttFormService.getAccountt).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accounttService.update).toHaveBeenCalledWith(expect.objectContaining(accountt));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountt>>();
      const accountt = { id: 123 };
      jest.spyOn(accounttFormService, 'getAccountt').mockReturnValue({ id: null });
      jest.spyOn(accounttService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountt: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountt }));
      saveSubject.complete();

      // THEN
      expect(accounttFormService.getAccountt).toHaveBeenCalled();
      expect(accounttService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountt>>();
      const accountt = { id: 123 };
      jest.spyOn(accounttService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accounttService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareOrganization', () => {
      it('Should forward to organizationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(organizationService, 'compareOrganization');
        comp.compareOrganization(entity, entity2);
        expect(organizationService.compareOrganization).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareUserr', () => {
      it('Should forward to userrService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(userrService, 'compareUserr');
        comp.compareUserr(entity, entity2);
        expect(userrService.compareUserr).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
