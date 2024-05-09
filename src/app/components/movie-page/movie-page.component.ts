import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { Movie } from '../../models/movie';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.css'
})
export class MoviePageComponent {
  
}
