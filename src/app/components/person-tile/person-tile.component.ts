import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgIf } from '@angular/common';

import { Credit } from '../../models/credit';
import { Observable } from 'rxjs';
import { MovieServiceService } from '../../services/movie-service.service';

@Component({
  selector: 'app-person-tile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './person-tile.component.html',
  styleUrl: './person-tile.component.css'
})
export class PersonTileComponent {
  @Input() credit?: Credit;
  imageUrl!: string;

  constructor(private service: MovieServiceService) {}

  ngOnChanges(): void {
    if (this.credit) {
      this.imageUrl = this.service.getImageURL(this.credit.profile_path, 'original');
    }
  }
}
