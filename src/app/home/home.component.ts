import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, AddTaskDialogComponent, TaskListComponent],
  providers: [DialogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completeTasks: Task[] = [];
  
  constructor(private tasksService: TasksService, private dialogService: DialogService) {}

  showTaskDialog() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add Task',
      width: '400px',  
      modal: true,
    });
    this.ref.onClose.subscribe((newTask: Task) => {
      if(newTask){
        switch (newTask.status) {
          case 'OPEN':
            this.openTasks = [newTask, ...this.openTasks];
            break;
          case 'IN_PROGRESS':
            this.inProgressTasks = [newTask, ...this.inProgressTasks];
            break;
          case 'COMPLETE':
            this.completeTasks = [newTask, ...this.completeTasks];
            break;
          default:
            break;
        };
      }
    });
  }

  editTask(task: Task) {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Edit Task',
      width: '400px',
      data: { task: { ...task } },
      modal: true,
  });
  this.ref.onClose.subscribe((updatedTask: Task) => {
    if (updatedTask) {
      this.updateTask(task,updatedTask);
    }
  });
}

  updateTask(oldTask: Task, updatedTask: Task) {
    const oldList = this.getTaskListByStatus(oldTask.status);
    const oldIndex = oldList.findIndex(t => t.id === oldTask.id);
    if (oldIndex !== -1) {
      oldList.splice(oldIndex, 1);
    }

    const newList = this.getTaskListByStatus(updatedTask.status);
    newList.unshift(updatedTask);

    if (oldTask.status === updatedTask.status && oldIndex !== -1) {
      const [task] = newList.splice(0, 1);
      newList.splice(oldIndex, 0, task);
    }
  }

getTaskListByStatus(status: string): Task[] {
  switch (status) {
    case 'OPEN':
      return this.openTasks;
    case 'IN_PROGRESS':
      return this.inProgressTasks;
    case 'COMPLETE':
      return this.completeTasks;
    default:
      return [];
}
}

getAllTasks() {
  this.tasksService.getTasks().subscribe((allTasks) => {
    this.openTasks = this.tasksService.filterTasksByStatus(allTasks, 'OPEN');
    console.log(this.openTasks);
    this.completeTasks = this.tasksService.filterTasksByStatus(allTasks,'COMPLETE');
    this.inProgressTasks = this.tasksService.filterTasksByStatus(allTasks,'IN_PROGRESS');
  });

}
  ngOnInit(): void {
    this.getAllTasks();
  }
}
