import { Component } from '@angular/core';

import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private app: AppComponent) {}

  switchTheme(): void {
    this.app.switchTheme();
  }
}
