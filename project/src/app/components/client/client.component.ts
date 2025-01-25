import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

 clientObj : Client = new Client() ;
  clientList : Client[] = [];
  clientService = inject(ClientService) ;

  ngOnInit(): void {
    this.loadClient() ;
  }

  loadClient() {
    this.clientService.getAllClient().subscribe((res:APIResponseModel) => {
      this.clientList = res.data ;
    })
  }

 
  onSaveClient() {
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
