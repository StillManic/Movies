import { Routes } from '@angular/router';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MoviePageComponent } from './components/movie-page/movie-page.component';

export const routes: Routes = [
    {path: 'page/:id/:pn', component: MoviePageComponent},
    {path: 'list/:id', component: MovieListComponent},
    {path: 'list', redirectTo: 'list/1'},
    {path: '', redirectTo: 'list/1', pathMatch: 'full'}
];
