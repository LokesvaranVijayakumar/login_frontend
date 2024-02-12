import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastr: ToastrService
  ) {}

  employee: Employee = new Employee();

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.signup();
  }

  signup() {
    this.employee = this.signUpForm.value as Employee;
    console.log(this.employee);
    this.employeeService.saveEmployee(this.employee).subscribe(
      (result) => {
        console.log(result);

        this.toastr.success('Redirecting to login page', 'SignUp Success');
        this.signUpForm.reset();

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 1500);
      },
      (error: any) => {
        this.signUpForm.reset();
        console.error(error.error);
        this.toastr.error(error.error);
      }
    );
  }
}
