//@Packages
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


//@Services
import { CommonService } from 'src/app/services/common.service';
import { StudentService } from 'src/app/services/student.service';

//@Models
import { StudentVM } from 'src/app/models/StudentVM';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  studentForm: FormGroup;
  submitted = false;
  maxDate: Date;
  studentId: string;

  studentModal = new StudentVM();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private studentService: StudentService) { }

  ngOnInit() {    
    this.initializeFormValue();
  }

  rebuildForm() {
    this.studentForm = this.formBuilder.group({
      _id: [this.studentModal._id],
      firstname: [this.studentModal.firstname, Validators.required],
      lastname: [this.studentModal.lastname, Validators.required],
      mobileno: [this.studentModal.mobileno, Validators.required],
      birthdate: [this.studentModal.birthdate, Validators.required],
      address: [this.studentModal.address]
    });
  }

  initializeFormValue() {
    this.studentModal = new StudentVM();
    this.maxDate = new Date();

    this.route.params.subscribe(params => { this.studentId = params['id']; });    

    this.getStudentDetail();
    this.rebuildForm();
  }

  getStudentDetail() {
    let self = this;

    self.commonService.showLoader();
    self.studentService.getStudentById(self.studentId).subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self.studentModal = response.data;

          if (!self.commonService.isNullOrEmpty(response.data.birthdate)) {
            self.studentModal.birthdate = new Date(self.commonService.parseDate(response.data.birthdate));
          }

          //rebuild form.
          self.rebuildForm();
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
    self.studentService.updateStudent(self.studentForm.value).subscribe(data => {
      self.commonService.hideLoader();

      if (!self.commonService.isNullOrEmpty(data)) {
        let response: any = data;
        if (response.success) {
          self.commonService.showToaster("Student details updated successfully.", "success");

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

  goToStudentList() {
    this.router.navigate(['/students']);
  }

  onDateValueChange(value: Date): void {
    console.log(value);
  }

}
