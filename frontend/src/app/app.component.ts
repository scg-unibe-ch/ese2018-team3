import {Component, OnInit} from '@angular/core';
import {TodoList} from './todo-list';
import {TodoItem} from './todo-item';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todoList: TodoList = new TodoList(null, '');
  todoLists: TodoList[] = [];

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.httpClient.get('http://localhost:3000/todolist').subscribe((instances: any) => {
      this.todoLists = instances.map((instance) => new TodoList(instance.id, instance.name));
    });
  }

  onTodoListCreate() {
    this.httpClient.post('http://localhost:3000/todolist', {
      'name': this.todoList.name
    }).subscribe((instance: any) => {
      this.todoList.id = instance.id;
      this.todoLists.push(this.todoList);
      this.todoList = new TodoList(null, '');
    });
  }

  onTodoListDestroy(todoList: TodoList) {
    this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
  }

}
