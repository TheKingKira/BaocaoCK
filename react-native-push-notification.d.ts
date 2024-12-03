declare module 'react-native-push-notification' {
    export interface NotificationOptions {
      id?: string;
      ticker?: string;
      autoCancel?: boolean;
      largeIcon?: string;
      smallIcon?: string;
      bigText?: string;
      subText?: string;
      color?: string;
      vibrate?: boolean;
      vibration?: number;
      tag?: string;
      group?: string;
      ongoing?: boolean;
      priority?: 'max' | 'high' | 'low' | 'min' | 'default';
      visibility?: 'public' | 'private' | 'secret';
      importance?: 'default' | 'high' | 'low' | 'max' | 'min' | 'none' | 'unspecified';
      allowWhileIdle?: boolean;
      ignoreInForeground?: boolean;
      onlyAlertOnce?: boolean;
      when?: Date | number;
      usesChronometer?: boolean;
      timeoutAfter?: number;
      messageId?: string;
      actions?: string[];
      invokeApp?: boolean;
      playSound?: boolean;
      soundName?: string;
      number?: string;
      repeatType?: 'time' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
      repeatTime?: number;
      date?: Date | string | number;
      title?: string;
      message: string;
      userInfo?: object;
    }
  
    export default class PushNotification {
      static configure(options: {
        onNotification: (notification: any) => void;
        onRegister?: (token: { os: string; token: string }) => void;
        onAction?: (notification: any) => void;
        onRegistrationError?: (err: any) => void;
        requestPermissions?: boolean;
        permissions?: {
          alert?: boolean;
          badge?: boolean;
          sound?: boolean;
        };
      }): void;
  
      static localNotification(notification: NotificationOptions): void;
  
      static localNotificationSchedule(notification: NotificationOptions): void;
  
      static cancelLocalNotifications(details: { id: string }): void;
  
      static cancelAllLocalNotifications(): void;
  
      static setApplicationIconBadgeNumber(number: number): void;
  
      static getApplicationIconBadgeNumber(callback: (number: number) => void): void;
  
      static popInitialNotification(callback: (notification: any) => void): void;
    }
  }
  