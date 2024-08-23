import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, AddTaskDialogComponent, TaskListComponent],
  providers: [DialogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
        this.openTasks = [newTask, ...this.openTasks];
      }
    });
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
