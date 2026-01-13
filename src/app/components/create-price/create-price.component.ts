import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-create-price',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-price.component.html',
  styleUrls: ['./create-price.component.css']
})
export class CreatePriceComponent {
  @Output() create = new EventEmitter<{ title: string; price: number }>();

  title = '';
  price: number | null = null;

  onCreate() {
    if (!this.title || this.price === null) return;
    this.create.emit({ title: this.title, price: this.price });
    this.title = '';
    this.price = null;
  }
}
