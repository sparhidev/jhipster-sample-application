import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IUserr } from '../userr.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../userr.test-samples';

import { UserrService } from './userr.service';

const requireRestSample: IUserr = {
  ...sampleWithRequiredData,
};

describe('Userr Service', () => {
  let service: UserrService;
  let httpMock: HttpTestingController;
  let expectedResult: IUserr | IUserr[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(UserrService);
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

    it('should create a Userr', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const userr = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(userr).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Userr', () => {
      const userr = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(userr).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Userr', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Userr', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Userr', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addUserrToCollectionIfMissing', () => {
      it('should add a Userr to an empty array', () => {
        const userr: IUserr = sampleWithRequiredData;
        expectedResult = service.addUserrToCollectionIfMissing([], userr);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userr);
      });

      it('should not add a Userr to an array that contains it', () => {
        const userr: IUserr = sampleWithRequiredData;
        const userrCollection: IUserr[] = [
          {
            ...userr,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUserrToCollectionIfMissing(userrCollection, userr);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Userr to an array that doesn't contain it", () => {
        const userr: IUserr = sampleWithRequiredData;
        const userrCollection: IUserr[] = [sampleWithPartialData];
        expectedResult = service.addUserrToCollectionIfMissing(userrCollection, userr);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userr);
      });

      it('should add only unique Userr to an array', () => {
        const userrArray: IUserr[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const userrCollection: IUserr[] = [sampleWithRequiredData];
        expectedResult = service.addUserrToCollectionIfMissing(userrCollection, ...userrArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const userr: IUserr = sampleWithRequiredData;
        const userr2: IUserr = sampleWithPartialData;
        expectedResult = service.addUserrToCollectionIfMissing([], userr, userr2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(userr);
        expect(expectedResult).toContain(userr2);
      });

      it('should accept null and undefined values', () => {
        const userr: IUserr = sampleWithRequiredData;
        expectedResult = service.addUserrToCollectionIfMissing([], null, userr, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(userr);
      });

      it('should return initial array if no Userr is added', () => {
        const userrCollection: IUserr[] = [sampleWithRequiredData];
        expectedResult = service.addUserrToCollectionIfMissing(userrCollection, undefined, null);
        expect(expectedResult).toEqual(userrCollection);
      });
    });

    describe('compareUserr', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUserr(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareUserr(entity1, entity2);
        const compareResult2 = service.compareUserr(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareUserr(entity1, entity2);
        const compareResult2 = service.compareUserr(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareUserr(entity1, entity2);
        const compareResult2 = service.compareUserr(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
