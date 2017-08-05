import { Injectable,Component,OnInit } from '@angular/core';
import {Http,Headers,RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

	restURL = "http://localhost:3000";
	constructor(private http:Http) { }
	getTasks():any{
		return this.http.get(this.restURL+"/task")
			.map(res => res.json());
	}

	deleteTask(id:String):any{
		console.log(id);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers:headers});
		return this.http.delete(this.restURL+"/task/"+id, options)
			.map(res => res.json());
	}

		updateTask(task:any):any{
			console.log(task);
			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({headers:headers});
			return this.http.put(this.restURL+"/task/"+task._id,task, options)
				.map(res => res.json());
		}
		
	addTask(task:any):any{
		console.log(task);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers:headers});
		return this.http.post(this.restURL+"/task",task, options)
			.map(res => res.json());
	}
}
