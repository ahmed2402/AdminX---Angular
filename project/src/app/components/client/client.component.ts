import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../../reuseableComponents/alert/alert.component";
import { MyButtonComponent } from "../../reuseableComponents/my-button/my-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  currentDate:Date = new Date();

  clientObj : Client = new Client() ;
  clientList : Client[] = [];
  clientService = inject(ClientService) ;
  isLoader2: boolean = true ;   



  ngOnInit(): void {
    this.loadClient() ;
    this.userList$ = this.clientService.getAllUser() ;
  }

  loadClient() {
    this.clientService.getAllClient().subscribe((res:APIResponseModel) => {
      this.clientList = res.data ;
      this.isLoader2 = false ;
    })
  }

 userList$ : Observable<any> = new Observable<any>;

  onSaveClient(data:string) {
    debugger ;
    this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel) => {
      if(res.result){
        alert("Client created Successfully")
        this.loadClient() ;
      } else {
        alert(res.message)
      }
    })
  }

 onEdit(data:Client) {
  this.clientObj = data ;
 }

 onReset() {
  this.clientObj = new Client();
 }

 onDelete(id:number) {
  const isDelete = confirm("Are you sure you want to Delete?")
  if (isDelete) {
    this.clientService.deletClientById(id).subscribe((res:APIResponseModel) => {
    if(res.result){
      alert("Client deleted Successfully")
      this.loadClient() ;
    } else {
      alert(res.message)
    }
 })
  }
}
}
