import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { Movie } from '../../movie';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
  movie: Movie = {
    title: "test",
    tagline: "test",
    overview: "test",
    release_date: "test"
  };

  constructor(private service: MovieServiceService) {}

  getMovie(): void {
    this.service.getMovie().subscribe(movie => this.movie = movie);
  }

  ngOnInit(): void {
    this.getMovie();
  }
}
