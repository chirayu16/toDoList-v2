import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Task } from '../models/task.model'; // Import the Task interface
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  providers: [DialogService],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
})
export class AddTaskDialogComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  value: string = '';
  date: Date | undefined;


  task: Task = {
    name: '',
    status: 'OPEN',
    dueDate: null,
    priority: '', 
  };


  priorityOptions: ('P0' | 'P1' | 'P2')[] = ['P0', 'P1', 'P2'];

  constructor(public dynamicDialogRef: DynamicDialogRef) {}

  onCancel() {
    this.dynamicDialogRef.close();
  }

  onSave() {
    this.dynamicDialogRef.close(this.task);
  }

  ngOnInit(): void {
  }
}
