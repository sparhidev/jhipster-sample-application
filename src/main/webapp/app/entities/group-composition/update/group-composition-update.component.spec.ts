import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { GroupCompositionFormService } from './group-composition-form.service';
import { GroupCompositionService } from '../service/group-composition.service';
import { IGroupComposition } from '../group-composition.model';

import { GroupCompositionUpdateComponent } from './group-composition-update.component';

describe('GroupComposition Management Update Component', () => {
  let comp: GroupCompositionUpdateComponent;
  let fixture: ComponentFixture<GroupCompositionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let groupCompositionFormService: GroupCompositionFormService;
  let groupCompositionService: GroupCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [GroupCompositionUpdateComponent],
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
      .overrideTemplate(GroupCompositionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GroupCompositionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    groupCompositionFormService = TestBed.inject(GroupCompositionFormService);
    groupCompositionService = TestBed.inject(GroupCompositionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const groupComposition: IGroupComposition = { id: 456 };

      activatedRoute.data = of({ groupComposition });
      comp.ngOnInit();

      expect(comp.groupComposition).toEqual(groupComposition);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupComposition>>();
      const groupComposition = { id: 123 };
      jest.spyOn(groupCompositionFormService, 'getGroupComposition').mockReturnValue(groupComposition);
      jest.spyOn(groupCompositionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupComposition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: groupComposition }));
      saveSubject.complete();

      // THEN
      expect(groupCompositionFormService.getGroupComposition).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(groupCompositionService.update).toHaveBeenCalledWith(expect.objectContaining(groupComposition));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupComposition>>();
      const groupComposition = { id: 123 };
      jest.spyOn(groupCompositionFormService, 'getGroupComposition').mockReturnValue({ id: null });
      jest.spyOn(groupCompositionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupComposition: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: groupComposition }));
      saveSubject.complete();

      // THEN
      expect(groupCompositionFormService.getGroupComposition).toHaveBeenCalled();
      expect(groupCompositionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IGroupComposition>>();
      const groupComposition = { id: 123 };
      jest.spyOn(groupCompositionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ groupComposition });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(groupCompositionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
