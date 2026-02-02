import { TodoModel,ToDoInterface } from "../schema/todo_schema";


export class TodoService {

    async getTask(){
        return await TodoModel.find();

    }
    createTask(){


    }
    updateTask(){

    }
    deleteTask(){

    }

}