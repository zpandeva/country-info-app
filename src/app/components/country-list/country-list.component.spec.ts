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

});
