import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-updateemployeebyadmin',
  templateUrl: './updateemployeebyadmin.component.html',
  styleUrl: './updateemployeebyadmin.component.css',
})
export class UpdateemployeebyadminComponent implements OnInit {
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
        role: [this.employee.role, Validators.required],
      });
    });
  }

  updateData() {
    if (this.updateForm.valid) {
      this.employee = this.updateForm.value;
      console.log(this.employee);

      const updatedData = this.updateForm.value;

      this.employeeService
        .updateEmployeeByAdmin(this.userId, updatedData)
        .subscribe(
          (result) => {
            this.successMessage = 'Employee Updated!';
            console.log(result);
            setTimeout(() => {
              this.router.navigate(['employeelist']);
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
