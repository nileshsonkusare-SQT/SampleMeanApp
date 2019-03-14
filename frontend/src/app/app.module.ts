//@Packages
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//@Pages
import { AppComponent } from './app.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { SidebarComponent } from './pages/common/sidebar/sidebar.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

//@Services
import { AppRoutingModule } from './app-routing.module';
import { CONFIG } from './shared/CONFIG';
import { CommonService } from './services/common.service';
import { StudentService } from './services/student.service';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentCreateComponent,
    StudentEditComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      tapToDismiss: false,
      closeButton: true
    }),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  providers: [
    CommonService,
    StudentService,
    HttpService,
    CONFIG
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
