import { Component, OnDestroy, Renderer2, OnInit, afterRender } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MovieListComponent } from './components/movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MovieListComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Movies';
  
  theme: string = 'dark';

  constructor(private renderer: Renderer2) {
    afterRender(() => {
      this.theme = 'dark';
      this.renderer.addClass(document.body, 'dark');
    });
  }

  switchTheme(): void {
    if (this.theme === 'dark') {
      this.theme = 'light';
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.addClass(document.body, 'light');
    } else {
      this.theme = 'dark';
      this.renderer.removeClass(document.body, 'light');
      this.renderer.addClass(document.body, 'dark');
    }
  }
}
