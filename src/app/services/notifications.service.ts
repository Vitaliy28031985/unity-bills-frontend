import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AppNotification,
  NotificationType
} from '../interfaces/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notification$ =
    new BehaviorSubject<AppNotification | null>(null);

  stream$ = this.notification$.asObservable();

  show(
    title: string,
    message: string,
    type: NotificationType = 'info'
  ) {
    this.notification$.next({ title, message, type });
  }

  close() {
    this.notification$.next(null);
  }
}
