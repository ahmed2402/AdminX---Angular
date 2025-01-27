import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee, Project } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {
 
  projectForm : FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl("",[Validators.required,Validators.minLength(5)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate: new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking:new FormControl(""),
    projectCost:new FormControl(""),
    projectDetails:new FormControl(""),
    contactPersonEmailId:new FormControl(""),
    clientId: new FormControl("")
  })

  clientSrv = inject(ClientService);
  employeeList : Employee[]=[];
  clientList : Client[]=[];
  projectList : Project [] = [] ;

ngOnInit(): void {
   this.getAllClient();
   this.getAllEmployee();
   this.getAllClientProject();
 }
  getAllEmployee() {
      this.clientSrv.getAllEmployee().subscribe((res: APIResponseModel) => {
          this.employeeList = res.data;
        })
      }
  getAllClient() {
      this.clientSrv.getAllClient().subscribe((res: APIResponseModel) => {
          this.clientList = res.data;
      });
    }

   getAllClientProject () {
    this.clientSrv.getAllClientProjects().subscribe((res:APIResponseModel) => {
      this.projectList = res.data ;
    })
   }

    onSaveProject() {
      const formValue = this.projectForm.value;
      debugger ;
      this.clientSrv.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel) => {
        if(res.result) {
          alert("Project Created Successfully") ;
        } else {
          alert(res.message) ;
        }
      })
    }

    onReset() {
      this.projectForm.reset();
     }
    

     onDelete(id:number) {
      const isDelete = confirm("Are you sure you want to Delete?")
      console.log(id);
      if (isDelete) {
        this.clientSrv.deleteProjectById(id).subscribe((res:APIResponseModel) => {
        if(res.result){
          alert("Client deleted Successfully")
          this.getAllClientProject() ;
        } else {
          alert(res.message)
        }
     })
      }
    }

    onEdit(data:Project) {
      this.projectForm.patchValue(data);
     }

  }

 


