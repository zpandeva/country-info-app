import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
  imports:[CommonModule]
})
export class CountryDetailComponent implements OnInit {
  country: any;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.loading = true;
      this.countryService.getCountryByName(name).subscribe({
        next: (data) => {
          this.country = data[0];
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load country details.';
          this.loading = false;
        },
      });
    }
  }
}
