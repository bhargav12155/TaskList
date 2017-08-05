import { Component,OnInit } from '@angular/core';

import {TaskService} from './task-service.service'

@Component({
  selector: 'task_manager',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit  {
    newTask: string;
    taskList: any;
    taskObj: any;
    displayLists: boolean =false;

    constructor(private taskService:TaskService) {
      this.newTask = '';
      this.taskList = [];
    }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.taskService.getTasks().subscribe(
      (data)=>{this.taskList = data;},
      (error)=>console.log(error),
      ()=>console.log("DONE")
    );
  }

    addTask(event) {
      this.taskObj = {
        name: this.newTask,
        completed: false
      }
      console.log(this.displayLists)
      console.log(this.taskObj.name)
      if (this.taskObj.name!=null)
      {
      this.displayLists=true;

      }
      console.log(this.displayLists)
      this.newTask = '';
      this.taskService.addTask(this.taskObj).subscribe(
        (data)=>{this.getTasks();},
        (error)=>console.log(error),
        ()=>console.log("DONE")
      );
      event.preventDefault();
    }

  deleteTask(index) {
  // this.taskList.splice(index, 1);
    this.taskService.deleteTask(this.taskList[index]._id).subscribe(
      (data)=>{this.getTasks();},
      (error)=>console.log(error),
      ()=>console.log("DONE")
    );
  }

  updateTask(task) {
  // this.taskList.splice(index, 1);
    this.taskService.updateTask(task).subscribe(
      (data)=>{this.getTasks();},
      (error)=>console.log(error),
      ()=>console.log("DONE")
    );
  }
    /*deleteSelectedTasks() {
      //need ES5 to reverse loop in order to splice by index
	  let selectedIds = [];
      for(var i=(this.taskList.length -1); i > -1; i--) {
        if(this.taskList[i].completed) {
          //this.taskList.splice(i, 1);
			       selectedIds.push(this.taskList[i].id);
        }
      }
      if(selectedIds.length > 0){
        this.taskService.deleteSelectedTasks(selectedIds).subscribe(
    			(data)=>{console.log(data);},
    			(error)=>console.log(error),
    			()=>console.log("DONE")
    		);
      }
    }*/

  }
