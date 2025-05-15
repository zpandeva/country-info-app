import { Routes } from '@angular/router';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CountryListComponent },
  { path: 'country/:name', component: CountryDetailComponent },
];
