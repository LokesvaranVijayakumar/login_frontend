import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../class/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateemployee',
  templateUrl: './updateemployee.component.html',
  styleUrl: './updateemployee.component.css',
})
export class UpdateemployeeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  userId!: number;
  employee!: Employee;
  updateForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.employee = new Employee();
    this.userId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.userId).subscribe((result) => {
      this.employee = result;
      console.log(this.employee);

      this.updateForm = this.formBuilder.group({
        id: [{ value: this.employee.id, disabled: true }, Validators.required],
        name: [this.employee.name, Validators.required],
        emailId: [this.employee.emailId, Validators.required],
        password: [this.employee.password, Validators.required],
        role: [
          { value: this.employee.role, disabled: true },
          Validators.required,
        ],
      });
    });
  }

  updateData() {
    if (this.updateForm.valid) {
      this.employee = this.updateForm.value;
      console.log(this.employee);

      const updatedData = this.updateForm.value;

      this.employeeService.updateEmployee(this.userId, updatedData).subscribe(
        (result) => {
          this.successMessage = 'Employee Updated!';
          console.log(result);
          setTimeout(() => {
            this.router.navigate(['userdashboard', this.userId]);
          }, 1000);
        },
        (error) => {
          console.error(error.error);
        }
      );
    }
  }

  onSubmit() {
    this.updateData();
  }
}
