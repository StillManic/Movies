import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { MovieTileComponent } from '../movie-tile/movie-tile.component';
import { MoviePage } from '../../models/movie-page';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MovieServiceService } from '../../services/movie-service.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [NgFor, NgIf, MovieTileComponent, PaginatorComponent, RouterLink, RouterLinkActive],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  page?: MoviePage;

  constructor(private route: ActivatedRoute, private router: Router, private service: MovieServiceService) {}

  getPopularMovies(id?: string): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getPopularMovies(params.get('id')! ? params.get('id')! : id))
    ).subscribe(page => this.page = page);
  }

  getPage(id: string) {
    this.getPopularMovies(id);
  }

  ngOnInit(): void {
    this.getPage('1');
  }

  getPreviousPage() {
    if (this.page) {
      if (this.page.page > 1) {
        this.getPopularMovies('' + (this.page.page - 1));
      }
    }
  }

  getNextPage() {
    if (this.page) {
      if (this.page.page < this.page.total_pages) {
        this.getPopularMovies('' + (this.page.page + 1));
      }
    }
  }
}
