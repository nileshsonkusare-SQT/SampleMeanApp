//@Packages
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { SweetAlertOptions } from 'sweetalert2';
import swal from 'sweetalert2'

//@Services
import { CommonService } from 'src/app/services/common.service';
import { StudentService } from 'src/app/services/student.service';

//@Models
import { StudentVM } from 'src/app/models/StudentVM';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: StudentVM[] = [];

  constructor(private router: Router,    
    private commonService: CommonService,
    private studentService: StudentService) { }

  ngOnInit() {    
    this.loadStudents();
  }

  loadStudents() {
    let self = this;
    
    self.commonService.showLoader();
    self.studentService.getStudents().subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self.students = response.data;
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

}
