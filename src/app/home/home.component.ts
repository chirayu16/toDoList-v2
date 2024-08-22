import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, AddTaskDialogComponent],
  providers: [DialogService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ref: DynamicDialogRef | undefined;
  openTasks: Task[] = [];
  constructor(private dialogService: DialogService) {}

  showTaskDialog() {
    this.ref = this.dialogService.open(AddTaskDialogComponent, {
      header: 'Add Task',
      width: '500px',
      height: '450px',  
      modal: true,
    });
    this.ref.onClose.subscribe((newTask: Task) => {
      console.log('dialog data:', newTask);
      this.openTasks.push(newTask);
    });
  }

  ngOnInit(): void {}

}
