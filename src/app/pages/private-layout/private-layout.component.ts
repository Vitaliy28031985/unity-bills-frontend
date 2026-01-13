import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notifications.service';
import { firstValueFrom } from 'rxjs';
import { linksData } from '../../common/links.data';
import { CommonModule } from '@angular/common';

interface NavLink {
  title: string;
  link: string;
}


@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.css'
})
export class PrivateLayoutComponent {
  constructor(private authService: AuthService, private notify: NotificationService, private router: Router) { }
  
  links: NavLink[] = linksData;
  protected isShowMenu = false;

  toggle() {
  this.isShowMenu = !this.isShowMenu;
  }


 async logout() {
    try {
      const logoutData = await firstValueFrom(this.authService.logout());
       if (logoutData?.message) {
      this.notify.show(
        'Помилка',
        logoutData.message,
        'error'
      );
      return; 
      }
      localStorage.removeItem('token');
      this.router.navigate(['/']);
       this.notify.show(
          'Успіх',
          'Ви успішно вийшли із застосунок!',
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


