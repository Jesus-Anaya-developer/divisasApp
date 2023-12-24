import { Routes } from '@angular/router';
import { SearchComponent } from "../app/components/search/search.component";

export const routes: Routes = [
  { path: 'home', component: SearchComponent },
  { path: '', component: SearchComponent },
  { path: '**', component: SearchComponent }
];
