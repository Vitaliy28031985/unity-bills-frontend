import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginModel } from '../../../model/authorization';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications.service';
import { firstValueFrom } from 'rxjs';
import { translateBackendError } from '../../common/error-messages';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private notify: NotificationService,  private router: Router) {}
  protected submitted = false;
  protected loginData = signal<Partial<LoginModel>>(
    {
      email: '',
      password: '',
    }
  )

   async login(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;

     const { email, password } = form.value;

     try {
       const loginData = await firstValueFrom(this.authService.login({
      email,
      password
       })); 
       
        if (loginData.token) {
          localStorage.setItem('token', loginData.token);
          this.router.navigate(['/private/costs']);
          this.notify.show(
          'Успіх',
          'Ви успішно уввійшли в застосунок!',
          'success'
          );
      form.resetForm();
        this.loginData.set({
          email: '',
          password: ''
        });

        this.submitted = false;
        } else {
          this.notify.show(
        'Помилка',
        translateBackendError(loginData.message),
        'error'
      );
      return; 
        }
     } catch (err: any) {
    
    this.notify.show(
      'Помилка',
      translateBackendError(err?.error?.message) || 'Помилка сервера',
      'error'
    );
  }
    


  }
}
