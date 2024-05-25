import { Component, OnDestroy, Renderer2, OnInit, afterRender } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NavComponent } from './components/nav/nav.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MovieListComponent, NavComponent, NgbModule, PaginatorComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Movies';
  
  theme: string = 'dark';

  switchTheme(): void {
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
}
