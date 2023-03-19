import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GroupCompositionDetailComponent } from './group-composition-detail.component';

describe('GroupComposition Management Detail Component', () => {
  let comp: GroupCompositionDetailComponent;
  let fixture: ComponentFixture<GroupCompositionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCompositionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ groupComposition: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(GroupCompositionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(GroupCompositionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load groupComposition on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.groupComposition).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
