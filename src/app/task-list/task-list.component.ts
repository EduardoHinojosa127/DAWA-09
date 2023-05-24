import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Task {
  _id: string;
  nombre: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      newTask: new FormControl('')
    });

    this.getTasks(); // Obtener las tareas al inicializar el componente
  }

  getTasks() {
    this.http.get<Task[]>('http://localhost:3000/tareas')
      .subscribe(
        (response: Task[]) => {
          this.tasks = response;
        },
        (error) => {
          console.error('Error al obtener las tareas:', error);
        }
      );
  }

  addTask() {
    const newTask = this.taskForm.get('newTask')?.value;
    if (newTask.trim() !== '') {
      this.http.post<Task>('http://localhost:3000/tareas', { nombre: newTask })
        .subscribe(
          (response: Task) => {
            this.tasks.push(response);
            this.taskForm.reset();
          },
          (error) => {
            console.error('Error al crear la tarea:', error);
          }
        );
    }
  }

  editTask(taskId: string, index: number) {
    const updatedTask = prompt('Editar tarea', this.tasks[index].nombre);
    if (updatedTask !== null && updatedTask.trim() !== '') {
      this.http.put<Task>(`http://localhost:3000/tareas/${taskId}`, { nombre: updatedTask })
        .subscribe(
          (response: Task) => {
            this.tasks[index].nombre = response.nombre;
          },
          (error) => {
            console.error('Error al actualizar la tarea:', error);
          }
        );
    }
  }

  deleteTask(taskId: string, index: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.http.delete(`http://localhost:3000/tareas/${taskId}`)
        .subscribe(
          () => {
            this.tasks.splice(index, 1);
          },
          (error) => {
            console.error('Error al eliminar la tarea:', error);
          }
        );
    }
  }
}
