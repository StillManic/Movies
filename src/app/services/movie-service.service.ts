import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { Movie } from '../models/movie';
import { MoviePage } from '../models/movie-page';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  imageUrl: string = 'https://image.tmdb.org/t/p/';
  singleMovie: string = '/movie/';
  pageOfMovies: string = '/discover/movie';

  apiKey: string = 'api_key=143727b61537517619f8325c517d1435';

  include_adult: boolean = false;
  include_video: boolean = false;

  constructor(private client: HttpClient) { }

  getMovie(id: string): Observable<Movie> {
    let url: string = this.baseUrl + this.singleMovie + id + '?' + this.apiKey;
    return this.client.get<Movie>(url);
  }

  getPopularMovies(pageNumber?: number): Observable<MoviePage> {
    if (!pageNumber) pageNumber = 1;
    let url: string = this.baseUrl + this.pageOfMovies + '?' + this.apiKey + '&' + `include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_release_type=2|3`;
    return this.client.get<MoviePage>(url);
  }

  getImageURL(path: string, size: string): string {
    return this.imageUrl + size + path;
  }
}
