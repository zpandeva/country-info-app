import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class CountryListComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  loading = false;
  error = '';
  search = '';
  sortAsc = true;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.filteredCountries = data;
        this.loading = false;
        this.sortCountries();
      },
      error: (err) => {
        this.error = 'Failed to load countries.';
        this.loading = false;
      },
    });
  }

  sortCountries(): void {
    this.filteredCountries.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
      if (nameA < nameB) return this.sortAsc ? -1 : 1;
      if (nameA > nameB) return this.sortAsc ? 1 : -1;
      return 0;
    });
  }

  onSearch(): void {
    const query = this.search.toLowerCase();
    this.filteredCountries = this.countries.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );
  }

  goToDetail(name: string): void {
    this.router.navigate(['/country', name]);
  }
}
