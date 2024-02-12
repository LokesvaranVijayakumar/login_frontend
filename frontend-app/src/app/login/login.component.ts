import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  employee: Employee = new Employee();
  resultEmployee: Employee = new Employee();

  loginForm = new FormGroup({
    emailId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  onSubmit() {
    // this.login();
    this.login2();
  }

  //returning entity as response and handling this
  login2() {
    this.employee = this.loginForm.value as Employee;
    console.log(this.employee);
    if (this.employee.role === 'admin') {
      this.employeeService.loginEmployee(this.employee).subscribe(
        (result) => {
          console.log('Result Id :' + result.id);
          this.toastr.success(
            'Redirecting to admin dashboard',
            'Admin Login Success'
          );
          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/admindashboard', result.id]);
          }, 2000);
        },
        (error) => {
          this.loginForm.reset();
          console.error('error : ' + error.status);
          if (error.status === 400) {
            this.toastr.warning(
              'Please provide valid credentials',
              'Invalid Credentials'
            );
          } else if (error.status === 404) {
            this.toastr.error('Signup first', 'Employee not found!');
          }
        }
      );
    } else if (this.employee.role === 'user') {
      this.employeeService.loginEmployee(this.employee).subscribe(
        (result) => {
          console.log('Result Id :' + result.id);
          this.toastr.success(
            'Redirecting to user dashboard',
            'User Login Success'
          );
          this.loginForm.reset();
          setTimeout(() => {
            this.router.navigate(['/userdashboard', result.id]);
          }, 2000);
        },
        (error) => {
          this.loginForm.reset();
          console.error('error : ' + error.status);
          if (error.status === 400) {
            this.toastr.warning(
              'Please provide valid credentials',
              'Invalid Credentials'
            );
          } else if (error.status === 404) {
            this.toastr.error('Signup first', 'Employee not found!');
          }
        }
      );
    }
  }

  //returning response as string and handling this
  // login() {
  //   this.employee = this.loginForm.value as Employee;
  //   console.log(this.employee);
  //   if (this.employee.role === 'admin') {
  //     this.employeeService.loginEmployee(this.employee).subscribe(
  //       (result) => {
  //         console.log(result);
  //         this.successMessage = result;
  //         this.loginForm.reset();
  //         if (result === 'Admin Login Success') {
  //           setTimeout(() => {
  //             this.successMessage = '';
  //             console.log(this.employee.id);
  //             this.router.navigate(['adminhome']);
  //           }, 2000);
  //         }
  //       },
  //       (error) => {
  //         this.loginForm.reset();
  //         console.error('error : ' + error.error);
  //         this.errorMessage = error.error;

  //         if (
  //           this.errorMessage === 'Invalid Credentials' ||
  //           this.errorMessage === 'Employee not found! Signup First'
  //         ) {
  //           setTimeout(() => {
  //             this.errorMessage = '';
  //             // window.location.reload();
  //           }, 1000);
  //         }
  //       }
  //     );
  //   } else if (this.employee.role === 'user') {
  //     this.employeeService.loginEmployee(this.employee).subscribe(
  //       (result) => {
  //         console.log(result);
  //         this.successMessage = result;
  //         this.loginForm.reset();

  //         if (result === 'User Login Success') {
  //           setTimeout(() => {
  //             this.router.navigate(['userhome']);
  //           }, 2000);
  //         }
  //       },
  //       (error) => {
  //         this.loginForm.reset();
  //         console.error(error.error);
  //         this.errorMessage = error.error;

  //         if (
  //           this.errorMessage === 'Invalid Credentials' ||
  //           this.errorMessage === 'Employee not found! Signup First'
  //         ) {
  //           setTimeout(() => {
  //             this.errorMessage = '';
  //             // window.location.reload();
  //           }, 1000);
  //         }
  //       }
  //     );
  //   }
  // }
}
