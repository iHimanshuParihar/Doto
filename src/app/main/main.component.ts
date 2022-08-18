import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.getTodo();
  }

  ngOnChanges() {
    //  console.log(this.getTodo())
  }

 //---------------------------------------------------Declarations------------------------------------------------------------------//

  TodoString: string = '';
  todoList: any = [];
  item: any = '';


 //---------------------------------------------------Functions to add , delete, get  and update todo------------------------------------------------------------------//


  addTodo(todo: any) {
   
    let key = this.todoList.length;
    this.item = todo;
    JSON.stringify(sessionStorage.setItem(key, this.item));
    this.todoList.push({ key: Number(key), value: this.item });
    this.TodoString = '';
  }

  
  /*
  In this function we create 3 variiables list, keys and length.Then assign keys ths key available in session storage.
  then to length we assigned the length of sessionstorage.Then using for loop list was assigned  the items usinmg its key
  and then pushed to todo using key and value and sorted the values according to its keys.
 */
  getTodo() {
    var list;
    var keys = Object.keys(sessionStorage);
    var length = sessionStorage.length;
    for (let i = 0; i < length; i++) {
      list = sessionStorage.getItem(keys[i]);
      this.todoList.push({ key: Number(keys[i]), value: list });
      this.todoList.sort((first: any, second: any) =>
        first.key > second.key ? 1 : -1
      );
    }
    return this.todoList;
  }

  deleteTodo(id: any) {
    for (let i = 0; i < this.todoList.length; i++) {
      if (this.todoList[i].key == id) {
        this.todoList.splice(i, 1);
        if (sessionStorage.hasOwnProperty(id)) {
          sessionStorage.removeItem(id);
        }
        break;
      }
    }
  }

  clearTodo() {
    sessionStorage.clear();
    this.todoList = [];
  }


editTodo(id:any){
  for (let i = 0; i < this.todoList.length; i++) {
    if (this.todoList[i].key == id) {
      this.TodoString = this.todoList[i].value;
    if (sessionStorage.hasOwnProperty(id)) {
      sessionStorage.removeItem(id);
      this.todoList.splice(i, 1);
    }
    break;
  }

}
}



}
