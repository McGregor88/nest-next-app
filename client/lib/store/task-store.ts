import { makeAutoObservable } from 'mobx';
import axios from 'axios';

export class TaskStore {
    data = [];
    isFetching = false;
    error = null;

    constructor() {
      makeAutoObservable(this);
    }

    fetchTasks = () => {
      this.isFetching = true;
      axios.get(`${process.env.API_URL}/tasks`)
       .then(response => {
          this.data = response.data;
          this.isFetching = false;
        })
       .catch(error => {
          this.error = error.message;
          this.isFetching = false;
          console.error(this.error);
        });
    }
  
    /*addTask(task: ITask) {
      this.data.push(task);
    }

    removeTask(taskId: string) {
      this.data = this.data.filter(task => task._id !== taskId);
    }*/
  }