import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DynamicDialogModule, CommonModule, HomeComponent, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ConfirmationService]
})
export class AppComponent {
  title = 'toDoList-v2';
}
