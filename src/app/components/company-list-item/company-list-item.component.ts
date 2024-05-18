import { Component, Input, OnChanges } from '@angular/core';
import { Logo } from '../../models/logo';
import { MovieServiceService } from '../../services/movie-service.service';
import { Observable } from 'rxjs';
import { ProductionCompany } from '../../models/production-company';
import { NgIf } from '@angular/common';
import { LogoResponse } from '../../models/logo-response';

@Component({
  selector: 'app-company-list-item',
  standalone: true,
  imports: [NgIf],
  templateUrl: './company-list-item.component.html',
  styleUrl: './company-list-item.component.css'
})
export class CompanyListItemComponent {
  @Input() company?: ProductionCompany;
  imageUrl?: string;

  constructor(private service: MovieServiceService) {}

  ngOnChanges(): void {
    if (this.company) {
      let response: Observable<LogoResponse> = this.service.getCompanyLogos(this.company.id);
      response.subscribe(resp => this.imageUrl = this.service.getImageURL(resp.logos.filter(logo => logo.file_type === '.svg')[0].file_path, 'w45'));
    }
  }
}
