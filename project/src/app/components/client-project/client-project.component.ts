import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee, Project } from '../../model/interface/role';
import { Client } from '../../model/class/Client';
import { sign } from 'node:crypto';
import { DatePipe } from '@angular/common';
import { AlertComponent } from "../../reuseableComponents/alert/alert.component";


@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe, AlertComponent],
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
  // projectList : Project [] = [] ;
  projectList = signal<Project[]>([]) ;
  isLoader2: boolean = true ;

  firstName = signal("Angular")

ngOnInit(): void {

  const name = this.firstName();
   this.getAllClient();
   this.getAllEmployee();
  //  this.getAllClientProject();
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

  //  getAllClientProject () {
  //   this.clientSrv.getAllClientProjects().subscribe((res:APIResponseModel) => {
  //     this.projectList = res.data ;
  //   })
  //  }


  getAllClientProject () {
      this.clientSrv.getAllClientProjects().subscribe((res:APIResponseModel) => {
        res.data.map((item: any) => {
          let employee = this.employeeList.find((x) => x.empId == item.empId)
          item.employeeEmail = employee?.empEmailId;
          item.contactName = employee?.empName;
        })
        this.projectList.set(res.data);
        this.isLoader2 = false ;
      })
     }


    onSaveProject() {
      const formValue = this.projectForm.value;
      debugger ;
      // let project_identifier = formValue.projectForm + 001;
      // localStorage.setItem("project");
      this.clientSrv.addClientProjectUpdate(formValue).subscribe((res:APIResponseModel) => {
        if(res.result) {
          alert("Project Created Successfully") ;
          this.getAllClientProject();
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
        //  alert("Client deleted Successfully")
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

     changeFName() {
      this.firstName.set("ReactJS");
    }
  

  }