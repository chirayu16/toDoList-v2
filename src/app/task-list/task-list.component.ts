import { CardModule } from 'primeng/card';
import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],

  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

}
