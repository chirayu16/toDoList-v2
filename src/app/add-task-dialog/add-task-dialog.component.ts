import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [ButtonModule],
  providers:[DialogService],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent implements OnInit {
    ref: DynamicDialogRef | undefined;
  
    task: Task = {
      name: '',
      status: 'OPEN',
      dueDate: new Date(),
      priority: 'P0',
    };
  
    constructor(public dynamicDialogRef: DynamicDialogRef) {}
  
    onCancel() {
      this.dynamicDialogRef.close();
    }
  
    onSave() {
      this.dynamicDialogRef.close(this.task);
    }
  
    ngOnInit(): void {
      this.task;
    }
  
  
} 
  