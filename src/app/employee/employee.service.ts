import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Employee } from './employee';
   
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
   
  private apiURL = "	http://dummy.restapiexample.com/api/v1";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.apiURL + '/employees')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.apiURL + '/create/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Employee> {
    return this.httpClient.get<Employee>(this.apiURL + '/employee/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id, employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.apiURL + '/update/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Employee>(this.apiURL + '/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}