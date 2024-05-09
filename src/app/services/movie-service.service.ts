import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


import { Movie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor(private client: HttpClient) { }

  getMovie(): Observable<Movie> {
    return this.client.get<Movie>('https://api.themoviedb.org/3/movie/11?api_key=143727b61537517619f8325c517d1435');
  }
}
