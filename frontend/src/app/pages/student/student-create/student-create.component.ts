//@Packages
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//@Services
import { CommonService } from 'src/app/services/common.service';
import { StudentService } from 'src/app/services/student.service';

//@Models
import { StudentVM } from 'src/app/models/StudentVM';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  studentForm: FormGroup;
  submitted = false;
  maxDate: Date;

  studentModal = new StudentVM();  

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentService: StudentService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.buildForm();
  }

  buildForm() {
    this.studentForm = this.formBuilder.group({
      firstname: [this.studentModal.firstname, Validators.required],
      lastname: [this.studentModal.lastname, Validators.required],
      mobileno: [this.studentModal.mobileno, Validators.required],
      birthdate: [this.studentModal.birthdate, Validators.required],
      address: [this.studentModal.address]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.studentForm.controls; }

  save() {
    let self = this;
    self.submitted = true;

    // stop here if form is invalid
    if (self.studentForm.invalid) {
        return;
    }

    console.log(self.studentForm.value);

    self.commonService.showLoader();
    self.studentService.createStudent(self.studentForm.value).subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self.commonService.showToaster("Student details saved successfully.", "success");

          this.goToStudentList();
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

  goToStudentList(){
    this.router.navigate(['/students']);
  }

  onDateValueChange(value: Date): void {
    console.log(value);
  }
}
