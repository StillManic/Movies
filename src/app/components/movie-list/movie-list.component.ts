import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { Movie } from '../../models/movie';
import { MoviePage } from '../../models/movie-page';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, MovieTileComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movies: Movie[] = []

  constructor(private service: MovieServiceService) {}

  getPopularMovies(): void {
    this.service.getPopularMovies(1).subscribe(page => this.movies = page.results);
  }

  ngOnInit(): void {
    this.getPopularMovies();
  }
}
