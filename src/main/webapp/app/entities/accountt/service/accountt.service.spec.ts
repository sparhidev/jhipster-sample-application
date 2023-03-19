import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAccountt } from '../accountt.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../accountt.test-samples';

import { AccounttService } from './accountt.service';

const requireRestSample: IAccountt = {
  ...sampleWithRequiredData,
};

describe('Accountt Service', () => {
  let service: AccounttService;
  let httpMock: HttpTestingController;
  let expectedResult: IAccountt | IAccountt[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AccounttService);
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

    it('should create a Accountt', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const accountt = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(accountt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Accountt', () => {
      const accountt = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(accountt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Accountt', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Accountt', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Accountt', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAccounttToCollectionIfMissing', () => {
      it('should add a Accountt to an empty array', () => {
        const accountt: IAccountt = sampleWithRequiredData;
        expectedResult = service.addAccounttToCollectionIfMissing([], accountt);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountt);
      });

      it('should not add a Accountt to an array that contains it', () => {
        const accountt: IAccountt = sampleWithRequiredData;
        const accounttCollection: IAccountt[] = [
          {
            ...accountt,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAccounttToCollectionIfMissing(accounttCollection, accountt);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Accountt to an array that doesn't contain it", () => {
        const accountt: IAccountt = sampleWithRequiredData;
        const accounttCollection: IAccountt[] = [sampleWithPartialData];
        expectedResult = service.addAccounttToCollectionIfMissing(accounttCollection, accountt);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountt);
      });

      it('should add only unique Accountt to an array', () => {
        const accounttArray: IAccountt[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const accounttCollection: IAccountt[] = [sampleWithRequiredData];
        expectedResult = service.addAccounttToCollectionIfMissing(accounttCollection, ...accounttArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const accountt: IAccountt = sampleWithRequiredData;
        const accountt2: IAccountt = sampleWithPartialData;
        expectedResult = service.addAccounttToCollectionIfMissing([], accountt, accountt2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(accountt);
        expect(expectedResult).toContain(accountt2);
      });

      it('should accept null and undefined values', () => {
        const accountt: IAccountt = sampleWithRequiredData;
        expectedResult = service.addAccounttToCollectionIfMissing([], null, accountt, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(accountt);
      });

      it('should return initial array if no Accountt is added', () => {
        const accounttCollection: IAccountt[] = [sampleWithRequiredData];
        expectedResult = service.addAccounttToCollectionIfMissing(accounttCollection, undefined, null);
        expect(expectedResult).toEqual(accounttCollection);
      });
    });

    describe('compareAccountt', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAccountt(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAccountt(entity1, entity2);
        const compareResult2 = service.compareAccountt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAccountt(entity1, entity2);
        const compareResult2 = service.compareAccountt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAccountt(entity1, entity2);
        const compareResult2 = service.compareAccountt(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
