import { Component } from '@angular/core';
import { Data } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  imports: [FormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
    firstName: string = "Ahmed" ;
    version: number = 18 ;
    isActive: boolean = false ;
    currentDate: Data = new Date();
    inputType: string = "radio" ;
    province: string = '' ;

    showWelcomeAlert () {
      alert("lalala")
    }

    showMsg (message: string) {
      alert(message)
    }
}
