import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';

import { Movie } from '../../models/movie';
import { MovieServiceService } from '../../services/movie-service.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Credits } from '../../models/credits';
import { PersonTileComponent } from '../person-tile/person-tile.component';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, AsyncPipe, PersonTileComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
  movie$!: Observable<Movie>;
  imageUrl!: string;
  credits!: Observable<Credits>;

  constructor(private route: ActivatedRoute, private router: Router, private service: MovieServiceService) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getMovie(params.get('id')!))
    );

    this.movie$.subscribe(movie => this.imageUrl = this.service.getImageURL(movie.poster_path, 'w342'));

    this.credits = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getCredits(params.get('id')!))
    );
  }

  gotoList(movie: Movie): void {
    const movieId = movie ? movie.id : null;

    this.router.navigate(['/list', {id: movieId}]);
  }
}
