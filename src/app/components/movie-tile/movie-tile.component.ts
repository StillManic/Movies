import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.css'
})
export class MovieTileComponent {
  @Input() movie?: Movie;
}
