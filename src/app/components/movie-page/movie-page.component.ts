import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';

import { Movie } from '../../models/movie';
import { MovieServiceService } from '../../services/movie-service.service';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Credits } from '../../models/credits';
import { PersonTileComponent } from '../person-tile/person-tile.component';
import { CompanyListItemComponent } from '../company-list-item/company-list-item.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, AsyncPipe, FontAwesomeModule, PersonTileComponent, CompanyListItemComponent],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
  faCaretLeft = faCaretLeft;

  movie$!: Observable<Movie>;
  credits!: Observable<Credits>;
  imageUrl!: string;
  pageNumber!: number;

  constructor(private route: ActivatedRoute, private router: Router, protected service: MovieServiceService) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getMovie(params.get('id')!))
    );

    this.movie$.subscribe(movie => {
      this.imageUrl = this.service.getImageURL(movie.poster_path, 'w342')
    });

    this.route.paramMap.subscribe(params => {
      let pn = params.get('pn');
      this.pageNumber = pn ? +pn : 1;
    });

    this.credits = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getCredits(params.get('id')!))
    );
  }

  goBackToList(): void {
    console.log(`going back to page [${this.pageNumber}]`);
    this.router.navigate([`/list/${this.pageNumber}`]);
  }
}
