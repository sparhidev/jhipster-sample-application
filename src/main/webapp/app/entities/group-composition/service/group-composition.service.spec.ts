import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGroupComposition } from '../group-composition.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../group-composition.test-samples';

import { GroupCompositionService } from './group-composition.service';

const requireRestSample: IGroupComposition = {
  ...sampleWithRequiredData,
};

describe('GroupComposition Service', () => {
  let service: GroupCompositionService;
  let httpMock: HttpTestingController;
  let expectedResult: IGroupComposition | IGroupComposition[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GroupCompositionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a GroupComposition', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const groupComposition = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(groupComposition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GroupComposition', () => {
      const groupComposition = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(groupComposition).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GroupComposition', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GroupComposition', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a GroupComposition', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addGroupCompositionToCollectionIfMissing', () => {
      it('should add a GroupComposition to an empty array', () => {
        const groupComposition: IGroupComposition = sampleWithRequiredData;
        expectedResult = service.addGroupCompositionToCollectionIfMissing([], groupComposition);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(groupComposition);
      });

      it('should not add a GroupComposition to an array that contains it', () => {
        const groupComposition: IGroupComposition = sampleWithRequiredData;
        const groupCompositionCollection: IGroupComposition[] = [
          {
            ...groupComposition,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addGroupCompositionToCollectionIfMissing(groupCompositionCollection, groupComposition);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GroupComposition to an array that doesn't contain it", () => {
        const groupComposition: IGroupComposition = sampleWithRequiredData;
        const groupCompositionCollection: IGroupComposition[] = [sampleWithPartialData];
        expectedResult = service.addGroupCompositionToCollectionIfMissing(groupCompositionCollection, groupComposition);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(groupComposition);
      });

      it('should add only unique GroupComposition to an array', () => {
        const groupCompositionArray: IGroupComposition[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const groupCompositionCollection: IGroupComposition[] = [sampleWithRequiredData];
        expectedResult = service.addGroupCompositionToCollectionIfMissing(groupCompositionCollection, ...groupCompositionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const groupComposition: IGroupComposition = sampleWithRequiredData;
        const groupComposition2: IGroupComposition = sampleWithPartialData;
        expectedResult = service.addGroupCompositionToCollectionIfMissing([], groupComposition, groupComposition2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(groupComposition);
        expect(expectedResult).toContain(groupComposition2);
      });

      it('should accept null and undefined values', () => {
        const groupComposition: IGroupComposition = sampleWithRequiredData;
        expectedResult = service.addGroupCompositionToCollectionIfMissing([], null, groupComposition, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(groupComposition);
      });

      it('should return initial array if no GroupComposition is added', () => {
        const groupCompositionCollection: IGroupComposition[] = [sampleWithRequiredData];
        expectedResult = service.addGroupCompositionToCollectionIfMissing(groupCompositionCollection, undefined, null);
        expect(expectedResult).toEqual(groupCompositionCollection);
      });
    });

    describe('compareGroupComposition', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareGroupComposition(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareGroupComposition(entity1, entity2);
        const compareResult2 = service.compareGroupComposition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareGroupComposition(entity1, entity2);
        const compareResult2 = service.compareGroupComposition(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareGroupComposition(entity1, entity2);
        const compareResult2 = service.compareGroupComposition(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
