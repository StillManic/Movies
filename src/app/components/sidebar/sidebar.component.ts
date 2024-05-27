import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, group } from '@angular/animations';
import { NgIf, NgFor, AsyncPipe, CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from '../../app.component';
import { MovieServiceService } from '../../services/movie-service.service';
import { Observable } from 'rxjs';
import { GenreList } from '../../models/genre-list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    // see @openClose in the .html template
    trigger('openClose', [
      state('open', style({ width: '200px' })),
      state('closed', style({ width: '75px' })),
      transition('open <=> closed', [
        group([
          animate('.2s'),
          query('@fade', [
            animateChild()
          ])
        ])
      ])
    ]),
    // trigger('fade', [
    //   state('open', style({ opacity: 1 })),
    //   state('closed', style({ opacity: 0 })),
    //   transition('open <=> closed', animate('.15s'))
    // ])
    trigger('fade', [
      state('open', style({ transform: 'translateX(0)', opacity: 1 })),
      state('closed', style({ transform: 'translateX(-100%)', opacity: 0 })),
      transition('open <=> closed', animate('.1s'))
    ])
  ]
})
export class SidebarComponent {
  faBars = faBars;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  open: boolean = true;
  genresOpen: boolean = true;
  typesOpen: boolean = true;
  genreList!: Observable<GenreList>; 

  constructor(private app: AppComponent, private service: MovieServiceService) {}

  ngOnInit(): void {
    this.genreList = this.service.getAllGenres();
  }

  switchTheme(): void {
    this.app.switchTheme();
  }

  toggle(): void {
    this.open = !this.open;
  }

  getAnimationState(): string {
    let state = this.open ? 'open' : 'closed';
    // console.log(`state: ${state}`)
    return state;
  }

  getAnimation(): any {
    return null;
  }
}
