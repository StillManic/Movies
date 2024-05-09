import { Component, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MoviePageComponent } from './components/movie-page/movie-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoviePageComponent, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Movies';
  
  theme: string = 'dark';

  constructor(private renderer: Renderer2) {}

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

  ngOnInit(): void {
    this.theme = "dark";
    this.renderer.addClass(document.body, 'dark');
  }
}
