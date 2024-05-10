import { Routes } from '@angular/router';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';

export const routes: Routes = [
    {path: 'page', component: MoviePageComponent},
    {path: 'list', component: MovieListComponent},
    {path: '', redirectTo: 'list', pathMatch: 'full'}
];
