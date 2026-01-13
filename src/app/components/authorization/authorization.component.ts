import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [CommonModule, LoginComponent,  RegisterComponent],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.css'
})
export class AuthorizationComponent {
isRegister = false;

toggle() {
  this.isRegister = !this.isRegister;
}
}
