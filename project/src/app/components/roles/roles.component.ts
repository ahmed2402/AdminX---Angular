import { Component,inject,model,OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { APIResponseModel, IRole } from '../../model/interface/role';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-roles',
  imports: [FormsModule,CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{
    // firstName: string = "Ahmed" ;
    // version: number = 18 ;
    // isActive: boolean = false ;
    // currentDate: Data = new Date();
    // inputType: string = "radio" ;
    // province: string = '' ;

    // showWelcomeAlert () {
    //   alert("lalala")
    // }

    // showMsg (message: string) {
    //   alert(message)
    // }

 roleList: IRole [] = [];   
 http = inject(HttpClient);
    

 ngOnInit(): void {
   this.getAllRoles();
 }

 getAllRoles() {
  this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles").subscribe((res:APIResponseModel)=> {
    this.roleList = res.data ;
  })
 }


}
