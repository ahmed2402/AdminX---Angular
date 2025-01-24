import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  ngOnInit(): void {
    
  }

  loadClient() {

  }

  clientObj : Client = new Client() ;
  clientList : Client[] = [];
  clientService = inject(ClientService)

  onSaveClient() {

  }
}
