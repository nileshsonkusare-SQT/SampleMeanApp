//@Packages
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SweetAlertOptions } from 'sweetalert2';
import swal from 'sweetalert2'

//@Services
import { CommonService } from 'src/app/services/common.service';
import { StudentService } from 'src/app/services/student.service';
import { PagerService } from '../../common/pagination/pager.service';

//@Models
import { StudentVM } from 'src/app/models/StudentVM';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: StudentVM[] = [];

  filtertext: string = "";
  sortColumn: string;
  sortDirection: string;
  pager: any = {}; //pager object
  totalCount: number;
  page: number = 1;
  pageSize: number;

  constructor(private router: Router,
    private commonService: CommonService,
    private pagerService: PagerService,
    private studentService: StudentService) {
    this.pageSize = this.commonService.DEFAULT_PAGE_SIZE;
  }

  ngOnInit() {
    this.sortColumn = "createdon";
    this.sortDirection = "desc";
    this.loadStudents();
  }

  loadStudents() {
    let self = this;

    self.commonService.showLoader();
    self.studentService.getStudents(self.filtertext, self.page, self.pageSize, self.sortColumn, self.sortDirection).subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          let result: any = response.data;
          console.log(result);

          self.students = result.docs;
          self.totalCount = result.total;
          self.setPage(self.page);
        } else {
          if (typeof response.message === 'object') {
            self.commonService.showToaster(JSON.stringify(response.message), "error");
          } else {
            self.commonService.showToaster(response.message, "error");
          }
        }
      }
    }, error => {
      self.commonService.hideLoader();
      self.commonService.showToaster(error.message, "error");
    })
  }

  editStudent(student: StudentVM) {
    this.router.navigate(['/student-edit', student._id]);
  }

  deleteStudent(student: StudentVM) {
    let self = this;

    const options: SweetAlertOptions = {
      title: 'Are you sure do you want to delete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "No",
      focusCancel: true
    };

    swal.fire(options).then((result) => {
      if (result.value) {
        self.commonService.showLoader();
        self.studentService.deleteStudent(student._id).subscribe(data => {
          self.commonService.hideLoader();

          if (!self.commonService.isNullOrEmpty(data)) {
            let response: any = data;
            if (response.success) {
              self.commonService.showToaster("Record deleted successfully.", "success");
              //load students.
              self.loadStudents();
            } else {
              if (typeof response.message === 'object') {
                self.commonService.showToaster(JSON.stringify(response.message), "error");
              } else {
                self.commonService.showToaster(response.message, "error");
              }
            }
          }
        }, error => {
          self.commonService.hideLoader();
          self.commonService.showToaster(error.message, "error");
        });
      }
    })
  }

  addStudent(): void {
    this.router.navigate(['/student-create']);
  };

  parseDate(date: string) {
    return this.commonService.parseDate(date);
  }

  /** Searching  */
  search() {
    this.page = 1;
    this.loadStudents();
  }

  onKeydown(event) {
    console.log(event);
    this.search();
  }

  /** Paging */
  pageChange(pageNo) {
    this.page = pageNo;
    console.log("Page No : " + pageNo);
  }

  goToPage(n: number): void {
    console.log("Page No : " + n);
    this.page = n;
    this.loadStudents();
  }

  changePageSize(n: number): void {
    console.log("Page Size : " + n);
    this.page = 1;
    this.pageSize = n;
    this.loadStudents();
  }

  goToFirstPage(): void {
    this.page = 1;
    this.loadStudents();
  }

  goToNextPage(): void {
    this.page++;
    this.loadStudents();
  }

  gotToPrevPage(): void {
    this.page--;
    this.loadStudents();
  }

  goToLastPage(): void {
    this.page = this.pager.totalPages;
    this.loadStudents();
  }

  setPage(pageNo: number) {
    let self = this;
    let totalPages = Math.ceil(self.totalCount / self.pageSize);
    if (pageNo < 1 || pageNo > totalPages) {
      return;
    }

    // get pager object from service
    self.pager = this.pagerService.getPager(self.totalCount, pageNo, self.pageSize);
    console.log(self.pager);
  }

  /** Dummy Students */
  dummyStudents() {
    let self = this;

    self.commonService.showLoader();
    self.studentService.dummyStudents().subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self.commonService.showToaster("Dummy Data Inserted Successfully.", "success");
          self.loadStudents();
        } else {
          if (typeof response.message === 'object') {
            self.commonService.showToaster(JSON.stringify(response.message), "error");
          } else {
            self.commonService.showToaster(response.message, "error");
          }
        }
      }
    }, error => {
      self.commonService.hideLoader();
      self.commonService.showToaster(error.message, "error");
    });
  }

  /** Sorting */
  onSorted($event) {
    console.log($event);
    var sortedEvent = $event;
    if (sortedEvent) {
      this.sortColumn = sortedEvent.sortColumn;
      this.sortDirection = sortedEvent.sortDirection;
      this.page = 1;
      this.loadStudents();
    }
  }

}