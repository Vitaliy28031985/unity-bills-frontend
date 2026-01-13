import { Component } from '@angular/core';

import { CostsListComponent } from '../../components/costs-list/costs-list.component';

@Component({
  selector: 'app-list-costs',
  standalone: true,
  imports: [CostsListComponent],
  templateUrl: './list-costs.component.html',
  styleUrl: './list-costs.component.css'
})
export class ListCostsComponent {

}
