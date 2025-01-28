import { Component,input,Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
   @Input() alertType:string = '' ;
   @Input() message:string = '' ;
}
