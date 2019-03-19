//@Packages
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'custom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() id: string; //id 
  @Input() pager: any = {}; // the pager object 

  @Output() goFirst = new EventEmitter<boolean>();
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goLast = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();
  @Output() changePageSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onFirst(): void {
    if (this.pager.currentPage > 1) {
      this.goFirst.emit(true);
    }
  }

  onPrev(): void {
    if (this.pager.currentPage > 1) {
      this.goPrev.emit(true);
    }
  }

  onNext(next: boolean): void {
    if (this.pager.currentPage !== this.pager.totalPages) {
      this.goNext.emit(next);
    }
  }

  onPage(n: number): void {
    this.goPage.emit(n);
  }

  onPageSizeChange(pageSize): void {    
    this.changePageSize.emit(+pageSize);
  }

  onLast(): void {
    if (this.pager.currentPage !== this.pager.totalPages) {
      this.goLast.emit(true);
    }
  }

  changePaging(pager: any) {
    this.pager = pager;
  }

}
