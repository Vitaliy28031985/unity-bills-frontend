import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PriceService } from '../../services/price.service';
import { Price } from '../prices-list/prices-list.component';

@Component({
  selector: 'app-create-costs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-costs.component.html',
  styleUrl: './create-costs.component.css'
})
export class CreateCostsComponent {
  constructor(private priceService: PriceService) { }

  @Output() create = new EventEmitter<{ title: string, number: number, price: number }>();
  @Output() toggleAdd = new EventEmitter<void>();



  pricesList: any = [];
  selectedId: string | null = null;
  number: any = '';


  ngOnInit(): void {
    this.loadPriceLists();
  }

  onToggle() {
  this.toggleAdd.emit();
}

  loadPriceLists() { 
      this.priceService.getPrices().subscribe({
        next: (data) => {
           
          this.pricesList = data;
                   },
         error: (err) => {
          console.error('Error loading cost lists', err);
        }
      })
  }

  getData() {
    const currentPrice = this.pricesList.filter((item: Price) => item._id === this.selectedId);
    
    return {title: currentPrice[0].title, number: this.number, price: currentPrice[0].price}
  }

  onCreate() {

      this.create.emit(this.getData());
    
  }

}
