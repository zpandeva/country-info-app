import { Component, computed, OnInit, signal } from '@angular/core';
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
  countries = signal<any[]>([]);
  search = signal('');
  sortAsc = signal(true);
  loading = signal(false);
  error = signal('');

  // Automatically reacts to changes in `countries`, `search`, or `sortAsc`
  filteredCountries = computed(() => {
    const q = this.search().toLowerCase();
    const sorted = [...this.countries()]
      .filter((c) => c.name.common.toLowerCase().includes(q))
      .sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return this.sortAsc()
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    return sorted;
  });

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load countries.');
        this.loading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.set(input.value);
  }

  toggleSort(): void {
    this.sortAsc.set(!this.sortAsc());
  }

  goToDetail(name: string): void {
    this.router.navigate(['/country', name]);
  }
}
