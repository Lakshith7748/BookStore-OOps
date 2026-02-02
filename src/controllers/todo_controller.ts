import { TodoService } from "../services/todo_service";
import express from "express";
import { Request,Response } from "express";


class ToDocontroller{
    todoService = new TodoService();
    app = express();


    getAllTaskRoute = async(req:Request,res:Response)=>{
       const task =  await this.todoService.getTask()
       res.json(task)

    }

}