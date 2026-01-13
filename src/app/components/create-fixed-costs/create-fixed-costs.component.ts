import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-fixed-costs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-fixed-costs.component.html',
  styleUrl: './create-fixed-costs.component.css'
})
export class CreateFixedCostsComponent {
  @Output() create = new EventEmitter<{ title: string; sum: number }>();

  title = '';
  sum: number | null = null;

  onCreate() {
    if (!this.title || this.sum === null) return;
    this.create.emit({ title: this.title, sum: this.sum });
    this.title = '';
    this.sum = null;
  }
}
