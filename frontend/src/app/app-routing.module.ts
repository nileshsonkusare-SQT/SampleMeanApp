//@Packages
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//@Pages
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
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
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
