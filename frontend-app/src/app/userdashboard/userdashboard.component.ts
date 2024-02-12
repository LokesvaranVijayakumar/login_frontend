import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../class/employee';
import { EmployeeService } from '../services/employee.service';
import { error } from 'node:console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css',
})
export class UserdashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  employee: any;
  userId!: number;
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    console.log(this.userId);
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.userId).subscribe(
      (result) => {
        this.employee = result;
      },
      (error) => {
        console.error(error.error);
      }
    );
  }

  updateEmployee(id: any) {
    this.router.navigate(['updateemployee', id]);
  }

  deleteEmployee(id: any) {
    if (
      window.confirm(
        'Are you sure you want to delete?.. If deleted account will be deleted'
      )
    ) {
      this.delete(id);
    }
  }

  delete(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((result) => {
      console.log(result);
      this.toastr.error(
        'Redirecting to login page',
        'User deleted successfull!'
      );
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    });
  }
}
