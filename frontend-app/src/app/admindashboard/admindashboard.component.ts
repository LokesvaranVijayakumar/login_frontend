import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent {
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  employee: any;
  userId!: number;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    console.log('Id :' + this.userId);
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployeeById(this.userId).subscribe(
      (result) => {
        this.employee = result;

        console.log(this.employee);
      },
      (error) => {
        console.error(error.error);
      }
    );
  }
  onClick() {
    this.router.navigate(['employeelist', this.userId]);
  }
}
