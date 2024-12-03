import * as Notifications from 'expo-notifications';

export async function scheduleNotification(content: any, trigger: any) {
  await Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });
}
