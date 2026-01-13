import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../services/notifications.service';

@Component({
  selector: 'app-allow-menu',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './allow-menu.component.html',
  styleUrl: './allow-menu.component.css'
})
export class AllowMenuComponent {

  constructor(private authService: AuthService, private notify: NotificationService) {}

  @Input() listId!: string | null;
   @Output() toggleAllow = new EventEmitter<void>();

  email: string = '';
  
 async addAllow() {
         try {
           const data = await firstValueFrom(this.authService.addToAllowList(this.email, this.listId ?? ''));
           if (data.message) {
             this.notify.show(
            'Помилка',
             data.message,
            'error'
              );
            return;
           }

           this.email = '';
           this.toggleAllow.emit();
             this.notify.show(
          'Успіх',
          `Ви успішно надали дозвіл користувачу з емайлом ${this.email}!`,
          'success'
          );
           } catch (err: any) {
    
    this.notify.show(
      'Помилка',
      err?.error?.message || 'Помилка сервера',
      'error'
    );
  }
  }

 async deleteAllow() {
 try {
   const data = await firstValueFrom(this.authService.removeFromAllowList(this.email, this.listId ?? ''));
   if (data.message) {
             this.notify.show(
            'Помилка',
             data.message,
            'error'
              );
            return;
           }
   this.email = '';
   this.toggleAllow.emit();
       this.notify.show(
          'Успіх',
          `Ви успішно анулювали дозвіл користувачу з емайлом ${this.email}!`,
          'success'
          );
           } catch (err: any) {
    
    this.notify.show(
      'Помилка',
      err?.error?.message || 'Помилка сервера',
      'error'
    );
  }
  }
}
