import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  employee: Employee = new Employee();

  successMessage: string = '';
  errorMessage: string = '';

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

        this.successMessage = result;
        this.signUpForm.reset();

        if (result === 'Employee created successfull!') {
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      },
      (error: any) => {
        this.signUpForm.reset();
        console.error(error.error);
        this.errorMessage = error.error;

        if (
          error.error === 'EmailId Already Exists !' ||
          error.error === 'Cannot create admin! Try as user'
        ) {
          setTimeout(() => {
            this.errorMessage = '';
            // window.location.reload();
          }, 1000);
        }
      }
    );
  }
}
