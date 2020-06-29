import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';
   
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    
  id: number;
  employee;data: Employee;
  form: FormGroup;
  
  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      this.employee = data;
    });
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required])
    });
  }
   
  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.employeeService.update(this.id, this.form.value).subscribe(res => {
         console.log('Employee updated successfully!');
         this.router.navigateByUrl('employee/index');
    })
  }
   
}