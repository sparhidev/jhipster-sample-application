import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserrDetailComponent } from './userr-detail.component';

describe('Userr Management Detail Component', () => {
  let comp: UserrDetailComponent;
  let fixture: ComponentFixture<UserrDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserrDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ userr: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(UserrDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(UserrDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load userr on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.userr).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
