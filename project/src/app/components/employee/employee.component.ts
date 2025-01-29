import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee, Project } from '../../model/interface/role';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  
  clientSrv= inject(ClientService) ;
  isLoader2: boolean = true ;   
  ngOnInit(): void {
    this.getAllEmployee();
  }
  

    employeeList : Employee[]=[];
        
    getAllEmployee() {
            this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
                this.employeeList = res.data;
                this.isLoader2 = false ;
              })
            }

            onDelete(id:number) {
              const isDelete = confirm("Are you sure you want to Delete?")
              console.log(id);
              if (isDelete) {
                this.clientSrv.deleteEmployeeById(id).subscribe((res:APIResponseModel) => {
                if(res.result){
                 //  alert("Client deleted Successfully")
                  this.getAllEmployee() ;
                } else {
                   alert(res.message)
                 }
              })
               }
             }

    }



