import { Component } from '@angular/core';
import { PricesListComponent } from '../../components/prices-list/prices-list.component';


@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [PricesListComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent {

}
