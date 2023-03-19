import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { GroupCompositionService } from '../service/group-composition.service';

import { GroupCompositionComponent } from './group-composition.component';

describe('GroupComposition Management Component', () => {
  let comp: GroupCompositionComponent;
  let fixture: ComponentFixture<GroupCompositionComponent>;
  let service: GroupCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'group-composition', component: GroupCompositionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [GroupCompositionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(GroupCompositionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(GroupCompositionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(GroupCompositionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.groupCompositions?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to groupCompositionService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getGroupCompositionIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getGroupCompositionIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
