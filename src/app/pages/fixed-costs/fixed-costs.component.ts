import { Component } from '@angular/core';
import { CostsFixedComponent } from '../../components/fixed-costs/fixed-costs.component';


@Component({
  selector: 'app-fixed-costs',
  standalone: true,
  imports: [CostsFixedComponent],
  templateUrl: './fixed-costs.component.html',
  styleUrl: './fixed-costs.component.css'
})
export class FixedCostsComponent {

}
