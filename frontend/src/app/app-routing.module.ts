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

//@Services
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Signup' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  },
  {
    path: 'students',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    data: { title: 'Student List' }
  },
  {
    path: 'student-create',
    component: StudentCreateComponent,
    canActivate: [AuthGuard],
    data: { title: 'Create Student' }
  },
  {
    path: 'student-edit/:id',
    component: StudentEditComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edit Student' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
