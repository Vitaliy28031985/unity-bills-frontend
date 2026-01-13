import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TabletCostsComponent } from '../../components/tablet-costs/tablet-costs.component';

@Component({
  selector: 'app-costs',
  standalone: true,
  imports: [RouterModule, TabletCostsComponent],
  templateUrl: './costs.component.html',
  styleUrl: './costs.component.css'
})
export class CostsComponent implements OnInit {

  id!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.id);
  }
}

