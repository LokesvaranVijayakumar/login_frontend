import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../class/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  backendURL = 'http://localhost:8080/api';

  getAllEmployees(): Observable<any> {
    return this.http.get(this.backendURL + '/employees');
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.backendURL + '/employees/signup', employee, {
      responseType: 'text',
    });
  }

  // loginEmployee(employee: Employee): Observable<any> {
  //   return this.http.post(this.backendURL + '/employees/login', employee, {
  //     responseType: 'text',
  //   });
  // }

  loginEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.backendURL + '/employees/login2', employee);
  }
  getEmployeeById(id: number): Observable<any> {
    const url = `${this.backendURL}/employees/${id}`;
    return this.http.get(url);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.backendURL + '/employees/delete/' + id, {
      responseType: 'text',
    });
  }

  updateEmployeeByAdmin(id: number, employee: Employee): Observable<any> {
    return this.http.put(
      this.backendURL + '/employees/admin/update/' + id,
      employee
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(this.backendURL + '/employees/update/' + id, employee);
  }
}
