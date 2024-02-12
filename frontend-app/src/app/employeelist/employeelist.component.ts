import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { __values } from 'tslib';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css',
})
export class EmployeelistComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  employee2: any;
  employee!: Employee[];
  employeeData: Employee = new Employee();
  userId!: number;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    console.log('Id :' + this.userId);
    this.getEmployee();
    this.getAllEmployees();
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.userId).subscribe(
      (result) => {
        this.employee2 = result;

        console.log(this.employee);
      },
      (error) => {
        console.error(error.error);
      }
    );
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((result) => {
      this.employee = result;
      console.log(result);
    });
  }

  updateEmployeeByAdmin(id: number) {
    this.router.navigate(['updateemployeebyadmin', id]);
  }

  deleteEmployee(id: number) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete(id);
    }
  }

  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((result) => {
      console.log(result);
      this.toastr.success(result);
      this.getAllEmployees();
    });
  }

  addEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.addEmployee();
  }

  addEmployee() {
    this.employeeData = this.addEmployeeForm.value as Employee;
    console.log(this.employeeData);
    this.employeeService.saveEmployee(this.employeeData).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success(result);
        this.addEmployeeForm.reset();

        setTimeout(() => {
          document.getElementById('closeButton')?.click();
          this.getAllEmployees();
        }, 1000);
      },
      (error: any) => {
        this.addEmployeeForm.reset();
        console.error(error.error);
        this.toastr.error(error.error);
      }
    );
  }
}
