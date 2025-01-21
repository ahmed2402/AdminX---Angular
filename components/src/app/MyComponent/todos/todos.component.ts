import { Component } from '@angular/core';
import { Todo } from '../../Todo';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-todos',
  imports: [CommonModule],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})


export class TodosComponent {
  todos: Todo[];
  constructor(){
    this.todos = [
      {
        sno:1,
        title: "This is title1",
        desc: "Description",
        active: true
      },
    ]
    this.todos = [
      {
        sno:2,
        title: "This is title2",
        desc: "Description",
        active: true
      },
    ]
    this.todos = [
      {
        sno:3,
        title: "This is title3",
        desc: "Description",
        active: true
      },
    ]
  }
}
