export type NotificationType = 'success' | 'error' | 'info';

export interface AppNotification {
  title: string;
  message: string;
  type: NotificationType;
}
