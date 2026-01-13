import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterModel } from '../../../model/authorization';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notifications.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { translateBackendError } from '../../common/error-messages';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   constructor(private authService: AuthService, private notify: NotificationService, private router: Router) {}
  protected submitted = false;
  protected registerData = signal<Partial<RegisterModel>>(
    {
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  )
  async register(form: NgForm) {
    this.submitted = true;

   
    if (form.invalid) return;

    const { userName, email, password } = form.value;
try {
  await firstValueFrom(
    this.authService.register({
      email,
      password,
      name: userName
    })
  );

  this.notify.show(
    'Успіх',
    'Ви успішно зареєструвались в застосунку!',
    'success'
  );

  form.resetForm();
  this.registerData.set({ email: '', password: '', userName: '' });
  this.submitted = false;

 
  try {
    const loginData = await firstValueFrom(
      this.authService.login({ email, password })
    );

    if (loginData?.token) {
      localStorage.setItem('token', loginData.token);
    }

    this.router.navigate(['/private/costs']);
  } catch (loginErr: any) {
    this.notify.show(
      'Помилка логіну',
      translateBackendError(loginErr?.error?.message) || 'Помилка сервера під час логіну',
      'error'
    );
  }
} catch (err: any) {
  this.notify.show(
    'Помилка',
    translateBackendError(err?.error?.message) || 'Помилка сервера під час реєстрації',
    'error'
  );
}

  }

}
