import { Component } from '@angular/core';
import { AuthorizationComponent } from '../../components/authorization/authorization.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthorizationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
