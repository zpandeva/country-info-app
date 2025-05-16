import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all countries', () => {
    const dummyCountries = [{ name: { common: 'France' }, region: 'Europe' }];
    service.getAllCountries().subscribe((countries) => {
      expect(countries.length).toBe(1);
      expect(countries).toEqual(dummyCountries);
    });

    const req = httpMock.expectOne('https://restcountries.com/v3.1/all');
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  });

  it('should fetch a country by name', () => {
    const dummyCountry = [{ name: { common: 'France' }, region: 'Europe' }];
    service.getCountryByName('France').subscribe((country) => {
      expect(country).toEqual(dummyCountry);
    });

    const req = httpMock.expectOne(
      'https://restcountries.com/v3.1/name/France'
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountry);
  });
});
