import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Movie } from '../models/movie';
import { MoviePage } from '../models/movie-page';
import { Credits } from '../models/credits';
import { Logo } from '../models/logo';
import { LogoResponse } from '../models/logo-response';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  imageUrl: string = 'https://image.tmdb.org/t/p/';
  singleMovie: string = '/movie/';
  company: string = '/company/';
  pageOfMovies: string = '/discover/movie';
  credits: string = '/credits';
  images: string = '/images';

  apiKey: string = 'api_key=143727b61537517619f8325c517d1435';

  include_adult: boolean = false;
  include_video: boolean = false;

  constructor(private client: HttpClient) { }

  getMovie(id: string): Observable<Movie> {
    let url: string = this.baseUrl + this.singleMovie + id + '?' + this.apiKey;
    return this.client.get<Movie>(url);
  }

  getPopularMovies(pageNumber?: string): Observable<MoviePage> {
    if (!pageNumber) pageNumber = '' + 1;
    let url: string = this.baseUrl + this.pageOfMovies + '?' + this.apiKey + '&' + `include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_release_type=2|3`;
    return this.client.get<MoviePage>(url);
  }

  getImageURL(path: string, size: string): string {
    return this.imageUrl + size + path;
  }

  getCredits(movieId: string): Observable<Credits> {
    let url: string = this.baseUrl + this.singleMovie + movieId + this.credits + '?' + this.apiKey;
    return this.client.get<Credits>(url);
  }

  getCompanyLogos(companyId: number): Observable<LogoResponse> {
    let url: string = this.baseUrl + this.company + companyId + this.images + '?' + this.apiKey;
    return this.client.get<LogoResponse>(url);
  }
}
