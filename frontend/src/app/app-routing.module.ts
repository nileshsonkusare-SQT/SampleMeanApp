//@Packages
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//@Pages
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/account/login/login.component';
import { SignupComponent } from './pages/account/signup/signup.component';
import { LoginLayoutComponent } from './pages/common/layouts/login-layout/login-layout.component';
import { AppLayoutComponent } from './pages/common/layouts/app-layout/app-layout.component';

//@Services
import { AuthGuard } from './services/auth/auth-guard.service';


const routes: Routes = [

  // App routes goes here (Which can access only by logged in users)
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'students',
        component: StudentListComponent,
        data: { title: 'Student List' }
      },
      {
        path: 'student-create',
        component: StudentCreateComponent,
        data: { title: 'Create Student' }
      },
      {
        path: 'student-edit/:id',
        component: StudentEditComponent,
        data: { title: 'Edit Student' }
      },
    ]
  },
  
  // Site/Login routes goes here (Which can access without login)
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: { title: 'Signup' }
      }
    ]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// export const routing = RouterModule.forRoot(routes);
