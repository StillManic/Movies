import { Component, AfterViewInit, AfterContentInit, OnChanges, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Router, ActivatedRoute, ParamMap, RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Renderer2 } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;

  @Input() currentPage: number = 1;

  // currentPage: number = 1;
  maxButtonCount: number = 5;
  totalPages: number = 12;
  pageNumbers?: number[];

  constructor(private router: Router, private renderer: Renderer2) {
    this.pageNumbers = this.getPageNumbers();
  }

  ngAfterViewInit(): void {
    this.applyActiveClass();
  }

  ngAfterContentInit(): void {
    this.pageNumbers = this.getPageNumbers();
  }

  ngOnChanges(): void {
    this.pageNumbers = this.getPageNumbers();
  }

  getPageNumbers(): number[] {
    let midpoint: number = Math.ceil(this.maxButtonCount / 2);
    let stop: number = Math.ceil(this.totalPages - midpoint - 1);
    let desiredStart: number = Math.max(1, this.currentPage - (midpoint - 1));
    let start: number = Math.min(stop, desiredStart);
    
    let count: number = Math.min(this.maxButtonCount, this.totalPages);

    console.log(`curr: ${this.currentPage}, stop: ${stop}, low: ${midpoint}, curr - stop - 1: ${this.currentPage - (stop - 1)}, curr - medianLow: ${this.currentPage - (midpoint - 1)}, count: ${count}, desired: ${desiredStart}, start: ${start}`);

    let arr: number[] = Array(count).fill(0).map((_, i) => i + start);

    console.log(arr);
    return arr;
  }

  switchToPage(pageNumber: number): void {
    console.log(`switching to page ${pageNumber}`);
    this.currentPage = pageNumber;
    this.applyActiveClass();
    this.router.navigate([`/list/${this.currentPage}`]);
  }

  private applyActiveClass(): void {
    if (typeof document !== 'undefined') {
      let buttons = document.getElementsByClassName('pageButton');
      for (let i = 0; i < buttons.length; i++) {
        let button = buttons.item(i);
        let buttonId = button?.getAttribute('buttonId');
        if (buttonId) {
          if (+buttonId === this.currentPage) {
            button?.classList.add('active');
          } else {
            button?.classList.remove('active');
          }
        }
      }
    }
  }

  gotoPreviousPage(): void {
    if (this.hasPreviousPage()) {
      this.switchToPage(this.currentPage - 1);
      this.pageNumbers = this.getPageNumbers();
    }
  }

  gotoNextPage(): void {
    if (this.hasNextPage()) {
      this.switchToPage(this.currentPage + 1);
      this.pageNumbers = this.getPageNumbers();
    }
  }

  isTagActive(tag: HTMLElement): boolean {
    let index = tag.getAttribute('buttonId');
    return !index || this.currentPage === +index;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
