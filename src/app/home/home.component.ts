import { ToastModule } from 'primeng/toast';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';
import { TaskListComponent } from '../task-list/task-list.component';
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { TasksService } from '../services/tasks.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, AddTaskDialogComponent, TaskListComponent, SearchFilterComponent, ToastModule],
  providers: [DialogService,TasksService, MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  allTasks: Task[] = [];
  openTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completeTasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText: string = '';
  priority: string = '';
  
  constructor(private tasksService: TasksService, private dialogService: DialogService, private messageService: MessageService) {}

  showTaskDialog() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add Task',
      width: '400px',  
      modal: true,
    });
    this.ref.onClose.subscribe((newTask: Task) => {
      if(newTask){
        this.allTasks.unshift(newTask);
        this.applyFilters();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Task saved successfully'});
      }
    });
  }

  onSearchTextChanged(searchText: string) {
    this.searchText = searchText;
    this.applyFilters();
  }
  
  onPriorityChanged(priority: string) {
    this.priority = priority;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTasks = this.allTasks.filter(task => {
      const matchesSearch = this.searchText ? 
        task.name.toLowerCase().includes(this.searchText.toLowerCase()) : true;
      
      const matchesPriority = this.priority ? 
        task.priority === this.priority : true;
      
      return matchesSearch && matchesPriority;
    });

    this.filteredTasks.sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });
  
    this.updateFilteredTaskLists();
  }

  updateFilteredTaskLists() {
    this.openTasks = this.filteredTasks.filter(task => task.status === 'OPEN');
    this.inProgressTasks = this.filteredTasks.filter(task => task.status === 'IN_PROGRESS');
    this.completeTasks = this.filteredTasks.filter(task => task.status === 'COMPLETE');
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
        this.updateTask(task, updatedTask);
      }
    });
  }

  deleteTask(task: Task) {
    const index = this.allTasks.findIndex(t => t.id == task.id);
    if(index != -1) {
      this.allTasks.splice(index, 1);
    }
    this.applyFilters();
  }

  updateTask(oldTask: Task, updatedTask: Task) {
    const index = this.allTasks.findIndex(t => t.id === oldTask.id);
    if (index !== -1) {
      this.allTasks.splice(index,1);
      this.allTasks.unshift(updatedTask);
    }
    this.applyFilters();
  }

  getAllTasks() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.allTasks = tasks;
      this.applyFilters();
    });
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
}