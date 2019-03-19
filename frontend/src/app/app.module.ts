//@Packages
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { JwtModule } from '@auth0/angular-jwt';

//@Pages
import { AppComponent } from './app.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { HeaderComponent } from './pages/common/header/header.component';
import { SidebarComponent } from './pages/common/sidebar/sidebar.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/account/login/login.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { LoginLayoutComponent } from './pages/common/layouts/login-layout/login-layout.component';
import { AppLayoutComponent } from './pages/common/layouts/app-layout/app-layout.component';
import { PaginationComponent } from './pages/common/pagination/pagination.component';

//@Services
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './shared/app-config';
import { REGEXP } from './shared/regexp';
import { CommonService } from './services/common.service';
import { StudentService } from './services/student.service';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AccountService } from './services/account.service';
import { PagerService } from './pages/common/pagination/pager.service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentCreateComponent,
    StudentEditComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    LoginLayoutComponent,
    AppLayoutComponent,
    PaginationComponent
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/authenticate', 'localhost:3000/api/account/Signup']
      }
    }),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  providers: [
    AppConfig,
    REGEXP,
    CommonService,
    AuthService,
    AuthGuard,
    AccountService,
    StorageService,
    StudentService,
    HttpService,
    PagerService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
