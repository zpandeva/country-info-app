import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryListComponent } from './country-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CountryService } from '../../services/country.service';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;
  let countryService: CountryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryListComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  it('should filter countries by name', () => {
    component.countries = [
      { name: { common: 'Spain' }, region: 'Europe' },
      { name: { common: 'Sweden' }, region: 'Europe' },
    ];
    component.search = 'swe';
    component.onSearch();
    expect(component.filteredCountries.length).toBe(1);
    expect(component.filteredCountries[0].name.common).toBe('Sweden');
  });
});
