import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, query, animateChild, group } from '@angular/animations';
import { NgIf } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    // see @openClose in the .html template
    trigger('openClose', [
      state('open', style({ width: '200px' })),
      state('closed', style({ width: '75px' })),
      transition('open <=> closed', [
        group([
          animate('.15s'),
          query('@fade', [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('fade', [
      state('open', style({ opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('open <=> closed', animate('.15s'))
    ])
  ]
})
export class SidebarComponent {
  faBars = faBars;

  open: boolean = true;

  toggle(): void {
    this.open = !this.open;
  }

  getAnimationState(): string {
    let state = this.open ? 'open' : 'closed';
    // console.log(`state: ${state}`)
    return state;
  }
}
